package com.erick.backend.utils;

import org.springframework.security.core.context.SecurityContextHolder;

/**
 * The {@code UserSession} class provides utility functions for accessing user session details.
 * This class cannot be instantiated and is designed to be used statically.
 * It leverages the Spring Security framework to interact with the security context.
 */
public class UserSession {

    /**
     * Private constructor to prevent instantiation of this utility class.
     *
     * @throws IllegalStateException if an attempt is made to instantiate this class.
     */
    private UserSession() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * Retrieves the email address of the currently authenticated user from the security context.
     * This method uses Spring Security's {@link SecurityContextHolder} to access the authentication details.
     *
     * @return A {@code String} representing the email address of the authenticated user.
     * Returns null if the authentication information is not available in the security context.
     */
    public static String getAuthenticatedEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
