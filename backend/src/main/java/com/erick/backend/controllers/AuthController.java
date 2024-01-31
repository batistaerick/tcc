package com.erick.backend.controllers;

import static org.springframework.http.ResponseEntity.ok;

import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.services.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for authentication-related operations.
 * This controller handles the generation of authentication tokens for users.
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenService service;

    /**
     * Generates authentication tokens for the currently authenticated user.
     * This method is called upon user login to generate access and refresh tokens.
     *
     * @param authentication The authentication object of the currently authenticated user.
     * @return A ResponseEntity containing the UserDto with token information.
     */
    @PostMapping("/login")
    public ResponseEntity<UserDto> token(Authentication authentication) {
        UserDto userDto = service.generateTokens(authentication);
        return ok(userDto);
    }
}
