package com.erick.backend.utils;

import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import java.util.regex.Pattern;
import org.springframework.http.HttpStatus;

/**
 * The {@code CredentialsChecker} class provides utility functions for validating user credentials.
 * It is a utility class and is not intended to be instantiated.
 */
public class CredentialsChecker {

    /**
     * Private constructor to prevent instantiation of this utility class.
     *
     * @throws IllegalStateException if an attempt is made to instantiate this class.
     */
    private CredentialsChecker() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * Validates the given password against specified criteria.
     * The password must meet the following requirements:
     * - At least 8 characters in length.
     * - Contains at least one digit.
     * - Contains at least one lower case alphabet character.
     * - Contains at least one upper case alphabet character.
     * - Contains at least one special character from [@#$%^&+=].
     *
     * @param password The password to be validated.
     * @throws GlobalException with HttpStatus.UNAUTHORIZED if the password does not meet the criteria.
     *                         The exception includes an internationalization code {@link I18nCode#INVALID_PASSWORD}
     *                         and a descriptive message.
     */
    public static void isValidPassword(String password) {
        String regex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$";
        boolean isValid = Pattern.compile(regex).matcher(password).matches();

        if (!isValid) {
            throw new GlobalException(
                HttpStatus.UNAUTHORIZED,
                I18nCode.INVALID_PASSWORD,
                "Password must have at least seven characters, one number, one uppercase/lowercase letter and one special character."
            );
        }
    }
}
