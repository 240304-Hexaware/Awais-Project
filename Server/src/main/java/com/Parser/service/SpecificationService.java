package com.Parser.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public Page<Specification> getSpecFiles(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public List<Specification> getAllSpecFiles() {
        return repository.findAll();
    }

    public Specification insert(Specification specification) {
        return repository.insert(specification);
    }

    public Specification update(Specification specification) {
        return repository.save(specification);
    }

    public Specification findById(String id) throws FileNotFoundException {
        return this.repository.findById(id)
                .orElseThrow(() -> new FileNotFoundException("Specification File: " + id + " not Found!"));
    }

    public void writeFile(MultipartFile file, String id) throws IOException {
        Path filePath = Paths.get(path, id + ".json");
        Files.write(filePath, file.getBytes());
    }
}
