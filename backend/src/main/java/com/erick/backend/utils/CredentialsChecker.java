package com.erick.backend.utils;

import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import java.util.regex.Pattern;
import org.springframework.http.HttpStatus;

public class CredentialsChecker {

    private CredentialsChecker() {
        throw new IllegalStateException("Utility class");
    }

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
