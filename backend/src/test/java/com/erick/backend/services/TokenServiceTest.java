package com.erick.backend.services;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;

import com.erick.backend.domains.dtos.UserDto;
import java.util.Collections;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

@ExtendWith(MockitoExtension.class)
class TokenServiceTest {

    @Mock
    private JwtEncoder encoder;

    @Mock
    private UserService userService;

    @Mock
    private Authentication authentication;

    @InjectMocks
    private TokenService tokenService;

    @Test
    void testGenerateTokens() {
        when(authentication.getName()).thenReturn("user@example.com");
        when(authentication.getAuthorities())
            .thenReturn(Collections.emptyList());
        Jwt jwt = Jwt
            .withTokenValue("token")
            .header("alg", "none")
            .claim("scope", "user")
            .build();
        when(encoder.encode(any(JwtEncoderParameters.class))).thenReturn(jwt);
        when(userService.findByAuthenticatedEmail()).thenReturn(new UserDto());

        UserDto result = tokenService.generateTokens(authentication);

        assertNotNull(result.getAccessToken());
        assertNotNull(result.getRefreshToken());
    }
}
