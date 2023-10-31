package com.erick.backend.exceptions;

import lombok.RequiredArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private final ResourceBundleMessageSource messageSource;

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<String> handleEmailNotFoundException(
        EmailNotFoundException exception
    ) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(exception.getMessage());
    }

    @ExceptionHandler(TransactionNotFoundException.class)
    public ResponseEntity<String> handleTransactionNotFoundException(
        TransactionNotFoundException exception
    ) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(exception.getMessage());
    }

    @ExceptionHandler(UnauthorizedTransactionDeletionException.class)
    public ResponseEntity<
        String
    > handleUnauthorizedTransactionDeletionException(
        UnauthorizedTransactionDeletionException exception
    ) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(exception.getMessage());
    }

    @ExceptionHandler(ImageException.class)
    public ResponseEntity<String> handleImageException(
        ImageException exception
    ) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(exception.getMessage());
    }

    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<String> handleInvalidPasswordException(
        InvalidPasswordException exception
    ) {
        String message = messageSource.getMessage(
            "invalid.password",
            null,
            LocaleContextHolder.getLocale()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
    }

    @ExceptionHandler(ExistingEmailException.class)
    public ResponseEntity<String> handleExistingEmailException(
        ExistingEmailException exception
    ) {
        String message = messageSource.getMessage(
            "email.exists",
            null,
            LocaleContextHolder.getLocale()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(message);
    }
}
