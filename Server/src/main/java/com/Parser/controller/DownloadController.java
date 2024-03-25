package com.Parser.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/download")
public class DownloadController {

    @GetMapping("/parse/file")
    public ResponseEntity<Resource> downloadParseFile(@RequestParam("filename") String filename) throws IOException {
        String filePath = "Server/src/main/resources/parse/" + filename;

        Path path = Paths.get(filePath);
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(Files.size(path))
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @GetMapping("/spec/file")
    public ResponseEntity<Resource> downloadSpecFile(@RequestParam("filename") String filename) throws IOException {
        // Replace this path with the actual path to your file
        String filePath = "Server/src/main/resources/specification/" + filename;

        // Load file as Resource
        Path path = Paths.get(filePath);
        ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

        // Set headers for the response
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(Files.size(path))
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

}
