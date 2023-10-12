package com.erick.backend.exceptions;

public class EmailNotFoundException extends RuntimeException {

    public EmailNotFoundException() {
        super("Email not found!");
    }
}
