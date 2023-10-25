package com.erick.backend.exceptions;

public class UnauthorizedTransactionDeletionException extends RuntimeException {

    public UnauthorizedTransactionDeletionException(
        String message,
        Object... objects
    ) {
        super(String.format(message, objects));
    }
}
