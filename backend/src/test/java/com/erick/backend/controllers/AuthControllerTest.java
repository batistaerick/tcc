package com.erick.backend.controllers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.services.TokenService;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

@ExtendWith(SpringExtension.class)
@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TokenService service;

    @Mock
    private Authentication authentication;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Test
    void testToken() throws Exception {
        UserDto userDto = UserDto
            .builder()
            .id(UUID.randomUUID())
            .firstName("Test")
            .email("test@example.com")
            .password("Password@123")
            .accessToken("access_token")
            .refreshToken("refresh_token")
            .build();

        when(service.generateTokens(any(Authentication.class)))
            .thenReturn(userDto);

        mockMvc
            .perform(
                post("/auth/login")
                    .with(jwt())
                    .contentType(MediaType.APPLICATION_JSON)
            )
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.email").value("test@example.com"))
            .andExpect(
                jsonPath("$.accessToken").value(userDto.getAccessToken())
            )
            .andExpect(
                jsonPath("$.refreshToken").value(userDto.getRefreshToken())
            );
    }
}
