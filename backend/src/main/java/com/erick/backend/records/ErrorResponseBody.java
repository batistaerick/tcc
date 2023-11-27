package com.erick.backend.records;

import org.springframework.http.HttpStatus;

public record ErrorResponseBody(
    HttpStatus status,
    String errorCode,
    String title,
    String message
) {}
