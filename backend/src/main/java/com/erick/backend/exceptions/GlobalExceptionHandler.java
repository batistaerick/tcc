package com.erick.backend.exceptions;

import com.erick.backend.records.ErrorResponseBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static org.springframework.http.ResponseEntity.status;

/**
 * Global exception handler class that catches exceptions across the whole application.
 * It provides centralized exception handling across all @RequestMapping methods through @ExceptionHandler methods.
 */
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {


    /**
     * Handles GlobalException instances that propagate through the application.
     * This method formats the exception into a structured response entity.
     *
     * @param exception The GlobalException instance to be handled.
     * @return A ResponseEntity object containing the details of the error, including HTTP status, internationalization code, title, and message.
     */
    @ExceptionHandler(GlobalException.class)
    public ResponseEntity<ErrorResponseBody> handleGlobalException(
        GlobalException exception
    ) {
        ErrorResponseBody body = new ErrorResponseBody(
            exception.getStatus(),
            exception.getI18nCode(),
            exception.getTitle(),
            exception.getMessage()
        );
        return status(exception.getStatus()).body(body);
    }
}
