package com.erick.backend.exceptions;

public class TransactionNotFoundException extends RuntimeException {

    public TransactionNotFoundException() {
        super("Transaction not found!");
    }
}
