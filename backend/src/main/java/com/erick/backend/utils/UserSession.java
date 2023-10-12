package com.erick.backend.utils;

import org.springframework.security.core.context.SecurityContextHolder;

public class UserSession {

    private UserSession() {
        throw new IllegalStateException("Utility class");
    }

    public static String getAuthenticatedEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
