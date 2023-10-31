package com.erick.backend.exceptions;

import org.slf4j.helpers.MessageFormatter;

public class ImageException extends RuntimeException {

    public ImageException(String message, Object... objects) {
        super(MessageFormatter.arrayFormat(message, objects).getMessage());
    }
}
