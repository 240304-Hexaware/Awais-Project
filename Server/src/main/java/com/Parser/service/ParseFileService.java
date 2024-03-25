package com.Parser.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Parser.entity.ParseFile;
import com.Parser.repository.ParseFileRepository;

@Service
public class ParseFileService {

    private final ParseFileRepository parseFileRepository;

    @Value("${file.path.parse}")
    private String path;

    public String getPath() {
        return this.path;
    }

    public ParseFileService(ParseFileRepository parseFileRepository) {
        this.parseFileRepository = parseFileRepository;
    }

    public Page<ParseFile> getParseFiles(Pageable pageable) {
        return parseFileRepository.findAll(pageable);
    }

    public ParseFile insert(ParseFile parseFile) {
        return this.parseFileRepository.insert(parseFile);
    }

    public ParseFile update(ParseFile parseFile) {
        return this.parseFileRepository.save(parseFile);
    }

    public void writeFile(MultipartFile file, String id) throws IOException {
        Path filePath = Paths.get(path, id + ".txt");
        Files.write(filePath, file.getBytes());
    }
}
