package com.erick.backend.exceptions;

public class RedirectResponseException extends RuntimeException {

    public RedirectResponseException(Throwable throwable) {
        super(throwable);
    }
}
