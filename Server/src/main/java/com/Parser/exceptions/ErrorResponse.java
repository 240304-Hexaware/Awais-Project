package com.Parser.exceptions;

public class ErrorResponse {
  private int statusCode;
  private String message;

  public ErrorResponse(int statusCode, String message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  public String getMessage() {
    return this.message;
  }

  public int getStatusCode() {
    return this.statusCode;
  }
}
