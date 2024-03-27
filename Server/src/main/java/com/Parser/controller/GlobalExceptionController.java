package com.Parser.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.Parser.exceptions.ErrorResponse;
import com.Parser.exceptions.FileNotFoundException;
import com.Parser.exceptions.MongoDbException;
import com.Parser.exceptions.UserExistException;
import com.Parser.exceptions.UserInvalidException;
import com.Parser.exceptions.UserNotFoundException;
import com.Parser.exceptions.UserUnauthorizedException;

@ControllerAdvice
public class GlobalExceptionController {

    @ExceptionHandler(UserExistException.class)
    @ResponseStatus(value = HttpStatus.CONFLICT)
    public @ResponseBody ResponseEntity<ErrorResponse> handleUserExistException(UserExistException ex) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse(HttpStatus.CONFLICT.value(), ex.getMessage()),
                HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserInvalidException.class)
    @ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
    public @ResponseBody ResponseEntity<ErrorResponse> handleUserInvalidException(UserInvalidException ex) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse(HttpStatus.UNPROCESSABLE_ENTITY.value(), ex.getMessage()),
                HttpStatus.UNPROCESSABLE_ENTITY);
    }

    @ExceptionHandler(UserUnauthorizedException.class)
    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    public @ResponseBody ResponseEntity<ErrorResponse> handleUserUnauthorizedException(UserUnauthorizedException ex) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), ex.getMessage()),
                HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public @ResponseBody ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MongoDbException.class)
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
    public @ResponseBody ResponseEntity<ErrorResponse> handleUserExistException(MongoDbException ex) {
        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(FileNotFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public @ResponseBody ResponseEntity<ErrorResponse> handleFileNotFoundException(FileNotFoundException ex) {
        return new ResponseEntity<ErrorResponse>(new ErrorResponse(HttpStatus.NOT_FOUND.value(), ex.getMessage()),
                HttpStatus.NOT_FOUND);
    }
}
