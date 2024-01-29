package com.erick.backend.utils;

import static org.junit.jupiter.api.Assertions.*;

import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

class CredentialsCheckerTest {

    @Test
    void testValidPassword() {
        // Test a valid password
        assertDoesNotThrow(() -> {
            CredentialsChecker.isValidPassword("ValidPassword1@");
        });
    }

    @Test
    void testInvalidPasswordShort() {
        // Test an invalid password that is too short
        GlobalException exception = assertThrows(
            GlobalException.class,
            () -> {
                CredentialsChecker.isValidPassword("Short1@");
            }
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        assertEquals(
            I18nCode.INVALID_PASSWORD.getCode(),
            exception.getI18nCode()
        );
        assertEquals(
            "Password must have at least seven characters, one number, one uppercase/lowercase letter and one special character.",
            exception.getMessage()
        );
    }

    @Test
    void testInvalidPasswordNoNumber() {
        // Test an invalid password with no number
        GlobalException exception = assertThrows(
            GlobalException.class,
            () -> {
                CredentialsChecker.isValidPassword("NoNumber@");
            }
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        assertEquals(
            I18nCode.INVALID_PASSWORD.getCode(),
            exception.getI18nCode()
        );
        assertEquals(
            "Password must have at least seven characters, one number, one uppercase/lowercase letter and one special character.",
            exception.getMessage()
        );
    }

    @Test
    void testInvalidPasswordNoUppercase() {
        // Test an invalid password with no uppercase letter
        GlobalException exception = assertThrows(
            GlobalException.class,
            () -> {
                CredentialsChecker.isValidPassword("nouppercase1@");
            }
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        assertEquals(
            I18nCode.INVALID_PASSWORD.getCode(),
            exception.getI18nCode()
        );
        assertEquals(
            "Password must have at least seven characters, one number, one uppercase/lowercase letter and one special character.",
            exception.getMessage()
        );
    }

    @Test
    void testInvalidPasswordNoSpecialCharacter() {
        // Test an invalid password with no special character
        GlobalException exception = assertThrows(
            GlobalException.class,
            () -> {
                CredentialsChecker.isValidPassword("NoSpecialCharacter1");
            }
        );

        assertEquals(HttpStatus.UNAUTHORIZED, exception.getStatus());
        assertEquals(
            I18nCode.INVALID_PASSWORD.getCode(),
            exception.getI18nCode()
        );
        assertEquals(
            "Password must have at least seven characters, one number, one uppercase/lowercase letter and one special character.",
            exception.getMessage()
        );
    }
}
