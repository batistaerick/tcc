package com.erick.backend.utils;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Collection;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

class UserSessionTest {

    @Test
    void testGetAuthenticatedEmail() {
        // Create a mock authentication with a known email
        Authentication authentication = new MockAuthentication(
            "test@example.com"
        );

        // Set the mock authentication in the SecurityContext
        SecurityContext securityContext = SecurityContextHolder.getContext();
        securityContext.setAuthentication(authentication);

        // Call the getAuthenticatedEmail method and verify the result
        String email = UserSession.getAuthenticatedEmail();
        assertEquals("test@example.com", email);
    }

    @Test
    void testGetAuthenticatedEmailNoAuthentication() {
        SecurityContextHolder.clearContext();
        assertThrows(
            NullPointerException.class,
            UserSession::getAuthenticatedEmail
        );
    }

    // Helper class to create a mock Authentication
    private record MockAuthentication(String email) implements Authentication {
        @Override
        public String getName() {
            return email;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
        }

        @Override
        public Object getCredentials() {
            return null;
        }

        @Override
        public Object getDetails() {
            return null;
        }

        @Override
        public Object getPrincipal() {
            return null;
        }

        @Override
        public boolean isAuthenticated() {
            return true;
        }

        @Override
        public void setAuthenticated(boolean isAuthenticated)
            throws IllegalArgumentException {}
    }
}
