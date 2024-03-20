package com.Parser.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Parser.entity.Specification;
import com.Parser.repository.SpecificationRepository;

@Service
public class SpecificationService {

    private final SpecificationRepository repository;

    @Value("${file.path.spec}")
    private String path;

    public String getPath() {
        return this.path;
    }

    public SpecificationService(SpecificationRepository repository) {
        this.repository = repository;
    }

    public Specification insert(Specification specification) {
        return repository.insert(specification);
    }

    public Specification update(Specification specification) {
        return repository.save(specification);
    }


    public Specification findById(String id) {
        return this.repository.findById(id).orElse(null);
    }

    public void writeFile(MultipartFile file) throws IOException {
        Path filePath = Paths.get(path, file.getOriginalFilename());
        Files.write(filePath, file.getBytes());
    }
}
