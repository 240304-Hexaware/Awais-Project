package com.Parser.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    ParsedRecordRepository recordRepository;

    public ParsedRecordService(ParseFileService parseFileService, SpecificationService specificationService,
            ParsedRecordRepository recordRepository) {
        this.parseFileService = parseFileService;
        this.specificationService = specificationService;
        this.recordRepository = recordRepository;
    }

    private ParsedRecord parseRecord(String line, JSONObject specification, String user, String parseFileName,
            String parseFileId,
            String specFileName,
            String specFileId) {
        ParsedRecord task = new ParsedRecord();

        task.setUser(user);
        task.setParseFileName(parseFileName);
        task.setParseFileId(parseFileId);
        task.setSpecificationName(specFileName);
        task.setSpecificationId(specFileId);

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

    public Page<ParsedRecord> getRecords(Pageable pageable) {
        return recordRepository.findAll(pageable);
    }

    public Page<ParseFile> getParseFiles(Pageable pageable) {
        return parseFileService.getParseFiles(pageable);
    }

    public Page<Specification> getSpecFiles(Pageable pageable) {
        return specificationService.getSpecFiles(pageable);
    }

    public List<Specification> getAllSpecFiles() {
        return specificationService.getAllSpecFiles();
    }

    public String uploadFiles(MultipartFile specFile, MultipartFile parseFile, String user) {

        try {

            JSONObject specJson = fileToJson(specFile);

            List<Map<String, String>> obj = new ArrayList<>();
            Map<String, String> map = new HashMap<String, String>();

            ParseFile parseFileObj = new ParseFile(null, parseFile.getOriginalFilename(), user, "", "");

            parseFileObj = parseFileService.insert(parseFileObj);

            parseFileService.writeFile(parseFile, parseFileObj.getId());

            map.put("parse_file_Name", parseFileObj.getFileName());
            map.put("parse_file_id", parseFileObj.getId());

            obj.add(map);

            Specification specFileObj = new Specification(null, specFile.getOriginalFilename(), specJson.toJSONString(),
                    user, obj);

            specFileObj = specificationService.insert(specFileObj);
            specificationService.writeFile(specFile, specFileObj.getId());

            parseFileObj.setSpecificationName(specFileObj.getFileName());
            parseFileObj.setSpecificationId(specFileObj.getId());

            parseFileService.update(parseFileObj);

            List<ParsedRecord> tasks = new ArrayList<>();
            BufferedReader buffer = getFileBuffer(parseFile);

            for (String line = ""; (line = buffer.readLine()) != null;) {

                ParsedRecord task = parseRecord(line, specJson, user, parseFileObj.getFileName(), parseFileObj.getId(),
                        specFileObj.getFileName(), specFileObj.getId());

                tasks.add(task);
            }

            recordRepository.insert(tasks);

        } catch (Exception e) {
            System.out.println(e.toString());
        }

        return "Data Parsed Successfully";
    }

    public String uploadParseFile(MultipartFile parseFile, String specFileId, String user) {

        try {

            List<Map<String, String>> obj = new ArrayList<>();
            Map<String, String> map = new HashMap<String, String>();
            Specification specFileObj = this.specificationService.findById(specFileId);

            /* ------------------------------ */

            ParseFile parseFileObj = new ParseFile(null, parseFile.getOriginalFilename(), user,
                    "", specFileId);

            parseFileObj = parseFileService.insert(parseFileObj);

            this.parseFileService.writeFile(parseFile, parseFileObj.getId());

            map.put("parse_file_Name", parseFileObj.getFileName());
            map.put("parse_file_id", parseFileObj.getId());

            obj.add(map);

            parseFileObj.setSpecificationName(specFileObj.getFileName());

            parseFileService.update(parseFileObj);

            /* ------------------------------ */

            obj.addAll(specFileObj.getParseFiles());

            specFileObj.setParseFiles(obj);

            specificationService.update(specFileObj);

            List<ParsedRecord> tasks = new ArrayList<>();
            BufferedReader buffer = getFileBuffer(parseFile);

            JSONObject specJson = (JSONObject) new JSONParser().parse(specFileObj.getJson());

            for (String line = ""; (line = buffer.readLine()) != null;) {

                ParsedRecord task = parseRecord(line, specJson, user, parseFileObj.getFileName(), parseFileObj.getId(),
                        specFileObj.getFileName(), specFileObj.getId());

                tasks.add(task);
            }

            recordRepository.insert(tasks);

        } catch (Exception e) {
            System.out.println(e.toString());
        }

        return "Files Uploaded";
    }

}
