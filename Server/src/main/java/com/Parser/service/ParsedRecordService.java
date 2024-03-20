package com.Parser.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Parser.entity.ParseFile;
import com.Parser.entity.Specification;
import com.Parser.entity.ParsedRecord;
import com.Parser.repository.ParsedRecordRepository;

@Service
public class ParsedRecordService {

    // @Autowired
    ParseFileService parseFileService;

    // @Autowired
    SpecificationService specificationService;

    // @Autowired
    ParsedRecordRepository taskRepository;

    public ParsedRecordService(ParseFileService parseFileService, SpecificationService specificationService,
            ParsedRecordRepository taskRepository) {
        this.parseFileService = parseFileService;
        this.specificationService = specificationService;
        this.taskRepository = taskRepository;
    }

    private ParsedRecord parseRecord(String line, JSONObject specification) {
        ParsedRecord task = new ParsedRecord();

        for (Object key : specification.keySet()) {

            JSONObject inner = (JSONObject) specification.get(key);
            long startPos = (Long) inner.get("startPos");
            long length = (Long) inner.get("length");
            int endPos = (int) (startPos + length);

            if (endPos <= line.length()) {
                String fieldValue = line.substring((int) startPos, endPos).trim();
                task.setField(key.toString(), fieldValue);

            } else {
                System.err.println("Field position out of bounds for: " + key);
            }
        }

        return task;
    }

    private BufferedReader getFileBuffer(MultipartFile file) throws IOException {

        InputStream inputStream = file.getInputStream();
        return new BufferedReader(new InputStreamReader(inputStream));
    }

    private JSONObject fileToJson(MultipartFile file) throws IOException, ParseException {

        BufferedReader buffer = getFileBuffer(file);

        return (JSONObject) new JSONParser().parse(buffer);
    }

    public List<ParsedRecord> uploadTask(MultipartFile specFile, MultipartFile parseFile) {

        List<ParsedRecord> tasks = new ArrayList<>();

        try {

            JSONObject specification = fileToJson(specFile);

            BufferedReader buffer = getFileBuffer(parseFile);

            for (String line = ""; (line = buffer.readLine()) != null;) {

                ParsedRecord task = parseRecord(line, specification);

                tasks.add(task);
            }

        } catch (Exception e) {

            System.out.println(e.toString());
        }

        return taskRepository.insert(tasks);
    }

    public String uploadFiles(MultipartFile specFile, MultipartFile parseFile) {

        try {

            JSONObject specJson = fileToJson(specFile);
            List<String> obj = new ArrayList<>();

            String specPath = specificationService.getPath();
            String parsePath = parseFileService.getPath();

            specificationService.writeFile(specFile);
            parseFileService.writeFile(parseFile);

            ParseFile parseFileObj = new ParseFile(null, parseFile.getOriginalFilename(), parsePath, "");

            parseFileObj = parseFileService.insert(parseFileObj);

            obj.add(parseFileObj.getId());

            Specification specFileObj = new Specification(null, specFile.getOriginalFilename(), specJson.toJSONString(),
                    specPath, obj);

            specFileObj = specificationService.insert(specFileObj);

            parseFileObj.setSpecificationId(specFileObj.getId());

            parseFileService.update(parseFileObj);

        } catch (Exception e) {
            System.out.println(e.toString());
        }

        return "Files Uploaded";
    }

    public String uploadParseFile(MultipartFile parseFile, String specFileId) {

        try {

            List<String> obj = new ArrayList<>();

            String parsePath = parseFileService.getPath();

            specificationService.writeFile(parseFile);

            ParseFile parseFileObj = new ParseFile(null, parseFile.getOriginalFilename(), parsePath, specFileId);

            parseFileObj = parseFileService.insert(parseFileObj);

            obj.add(parseFileObj.getId());

            Specification specFileObj = this.specificationService.findById(specFileId);

            obj.addAll(specFileObj.getParseFilesId());

            specFileObj.setParseFilesId(obj);

            specificationService.update(specFileObj);

        } catch (Exception e) {
            System.out.println(e.toString());
        }

        return "Files Uploaded";
    }

}
