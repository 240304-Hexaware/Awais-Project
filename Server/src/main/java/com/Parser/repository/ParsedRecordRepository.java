package com.Parser.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Parser.entity.ParsedRecord;

@Repository
public interface ParsedRecordRepository extends MongoRepository<ParsedRecord, String> {

}
