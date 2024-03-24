package com.Parser.controller;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Parser.entity.ParseFile;
import com.Parser.entity.ParsedRecord;
import com.Parser.entity.Specification;
import com.Parser.service.ParsedRecordService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/parse")
public class RecordController {

    // @Autowired
    ParsedRecordService fileServices;

    public RecordController(ParsedRecordService fileServices) {
        this.fileServices = fileServices;
    }

    @GetMapping("/data")
    public ResponseEntity<Page<ParsedRecord>> getParsedData(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {

        Pageable pageable = PageRequest.of(page, size, direction, sort);
        return ResponseEntity.ok().body(fileServices.getRecords(pageable));
    }

    @GetMapping("/file")
    public ResponseEntity<Page<ParseFile>> getParsedFile(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {

        Pageable pageable = PageRequest.of(page, size, direction, sort);
        return ResponseEntity.ok().body(fileServices.getParseFiles(pageable));
    }

    @GetMapping("/spec")
    public ResponseEntity<Page<Specification>> getSpecFile(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sort,
            @RequestParam(defaultValue = "DESC") Sort.Direction direction) {

        Pageable pageable = PageRequest.of(page, size, direction, sort);
        return ResponseEntity.ok().body(fileServices.getSpecFiles(pageable));
    }

    @PostMapping("/file/upload")
    public String fileHandler(@RequestParam("specFile") MultipartFile specFile,
            @RequestParam("parseFile") MultipartFile parseFile) {

        return fileServices.uploadFiles(specFile, parseFile);
    }

    @PostMapping("/file/upload/{id}")
    public String parseFileHandler(@RequestParam("parseFile") MultipartFile parseFile,
            @PathVariable("id") String specFileId) {

        return fileServices.uploadParseFile(parseFile, specFileId);
    }

    @PostMapping("/task")
    public List<ParsedRecord> taskHandler(@RequestParam("specFile") MultipartFile specFile,
            @RequestParam("parseFile") MultipartFile parseFile) {

        return fileServices.uploadTask(specFile, parseFile);
    }

}
