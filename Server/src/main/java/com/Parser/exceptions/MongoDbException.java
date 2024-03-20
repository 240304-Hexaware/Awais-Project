package com.Parser.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.mongodb.MongoException;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class MongoDbException extends MongoException {
    public MongoDbException(String message) {
        super(message);
    }
}
