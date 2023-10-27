package com.erick.backend.exceptions;

import org.slf4j.helpers.MessageFormatter;

public class UnauthorizedTransactionDeletionException extends RuntimeException {

    public UnauthorizedTransactionDeletionException(
        String message,
        Object... objects
    ) {
        super(MessageFormatter.arrayFormat(message, objects).getMessage());
    }
}
