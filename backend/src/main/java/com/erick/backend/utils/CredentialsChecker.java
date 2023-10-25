package com.erick.backend.utils;

import com.erick.backend.exceptions.InvalidPasswordException;
import java.util.regex.Pattern;

public class CredentialsChecker {

    private CredentialsChecker() {
        throw new IllegalStateException("Utility class");
    }

    public static void isValidPassword(String password) {
        String regex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$";
        boolean isValid = Pattern.compile(regex).matcher(password).matches();

        if (!isValid) {
            throw new InvalidPasswordException();
        }
    }
}
