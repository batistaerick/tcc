package com.erick.backend.exceptions;

import com.erick.backend.enums.I18nCode;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.http.HttpStatus;

/**
 * Custom exception class for handling global exceptions in the application.
 * This class extends the RuntimeException and includes additional fields for HTTP status and internationalization code.
 */
@Getter
@Log4j2
public class GlobalException extends RuntimeException {

    private final HttpStatus status;
    private final String i18nCode;
    private final String title;

    /**
     * Constructs a new GlobalException with the specified details.
     *
     * @param throwable The underlying cause of this exception.
     * @param status    The HTTP status associated with this exception.
     * @param i18nCode  The internationalization code for the exception message.
     * @param message   The detail message. The detail message is saved for later retrieval by the getMessage() method.
     * @param objects   Additional objects to be formatted within the message.
     */
    public GlobalException(
        Throwable throwable,
        HttpStatus status,
        I18nCode i18nCode,
        String message,
        Object... objects
    ) {
        super(MessageFormatter.arrayFormat(message, objects).getMessage());
        this.status = status;
        this.i18nCode = i18nCode.getCode();
        this.title = status.getReasonPhrase();
        log.error(throwable);
    }

    /**
     * Constructs a new GlobalException with the specified details.
     *
     * @param status   The HTTP status associated with this exception.
     * @param i18nCode The internationalization code for the exception message.
     * @param message  The detail message. The detail message is saved for later retrieval by the getMessage() method.
     * @param objects  Additional objects to be formatted within the message.
     */
    public GlobalException(
        HttpStatus status,
        I18nCode i18nCode,
        String message,
        Object... objects
    ) {
        super(MessageFormatter.arrayFormat(message, objects).getMessage());
        this.status = status;
        this.i18nCode = i18nCode.getCode();
        this.title = status.getReasonPhrase();
        log.error(message);
    }
}
