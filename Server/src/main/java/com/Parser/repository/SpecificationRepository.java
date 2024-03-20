package com.Parser.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Parser.entity.Specification;

@Repository
public interface SpecificationRepository extends MongoRepository<Specification, String> {
    
}
