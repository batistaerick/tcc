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

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final TokenService service;

    @PostMapping("/login")
    public ResponseEntity<UserDto> token(Authentication authentication) {
        UserDto userDto = service.generateTokens(authentication);
        return ok(userDto);
    }
}
