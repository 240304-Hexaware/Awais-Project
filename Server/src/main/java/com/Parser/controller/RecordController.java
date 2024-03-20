package com.Parser.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.Parser.entity.ParsedRecord;
import com.Parser.service.ParsedRecordService;

@RestController
@RequestMapping("/file")
public class RecordController {

    // @Autowired
    ParsedRecordService fileServices;

    public RecordController(ParsedRecordService fileServices) {
        this.fileServices = fileServices;
    }

    @PostMapping("/upload")
    public String fileHandler(@RequestParam("specFile") MultipartFile specFile,
            @RequestParam("parseFile") MultipartFile parseFile) {

        return fileServices.uploadFiles(specFile, parseFile);
    }

    @PostMapping("/upload/{id}")
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
