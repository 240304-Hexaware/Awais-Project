package com.Parser.repository;

import com.Parser.entity.ParseFile;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParseFileRepository extends MongoRepository<ParseFile, String> {
    
}
