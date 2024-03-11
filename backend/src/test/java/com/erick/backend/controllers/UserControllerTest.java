package com.erick.backend.controllers;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.erick.backend.domains.dtos.RoleDto;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.Role;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.RoleName;
import com.erick.backend.repositories.UserRepository;
import com.erick.backend.services.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@ExtendWith(SpringExtension.class)
@WebMvcTest(UserController.class)
class UserControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService service;

    @MockBean
    private UserRepository repository;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    public void setup() {
        mockMvc =
            MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void save_shouldReturnCreatedResponseAndUserDto() throws Exception {
        UserDto userDto = createMockUserDto();
        UserDto returnedUserDto = createMockUserDto();

        given(service.save(any(UserDto.class))).willReturn(returnedUserDto);

        mockMvc
            .perform(
                post("/users")
                    .with(jwt())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(userDto))
            )
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.email").value(returnedUserDto.getEmail()))
            .andExpect(jsonPath("$.name").value(returnedUserDto.getName()));
        verify(service, times(1)).save(any(UserDto.class));
    }

    @Test
    void update_shouldReturnNoContentResponse() throws Exception {
        UserDto updatedUser = createMockUserDto();
        updatedUser.setPassword("NewPassword@123");
        User returnedUser = createMockUser();

        given(repository.findByEmail(anyString()))
            .willReturn(Optional.of(returnedUser));
        given(service.save(any(UserDto.class))).willReturn(new UserDto());

        mockMvc
            .perform(
                put("/users")
                    .with(jwt())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(updatedUser))
            )
            .andExpect(status().isNoContent());
        verify(service, times(1)).update(any(UserDto.class));
    }

    @Test
    void findByAuthenticated_ValidUser() throws Exception {
        UserDto userDto = createMockUserDto();

        given(service.findByAuthenticatedEmail()).willReturn(userDto);

        mockMvc
            .perform(get("/users/current-user").with(jwt()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(userDto.getId().toString()))
            .andExpect(jsonPath("$.email").value(userDto.getEmail()))
            .andExpect(jsonPath("$.name").value(userDto.getName()));
        verify(service, times(1)).findByAuthenticatedEmail();
    }

    private User createMockUser() {
        return User
            .builder()
            .id(UUID.randomUUID())
            .name("Test User")
            .email("test@test.com")
            .password("Password@123")
            .roles(Set.of(Role.builder().roleName(RoleName.USER).build()))
            .build();
    }

    private UserDto createMockUserDto() {
        return UserDto
            .builder()
            .id(UUID.randomUUID())
            .name("Test User")
            .email("test@test.com")
            .password("Password@123")
            .roles(Set.of(RoleDto.builder().roleName(RoleName.USER).build()))
            .build();
    }
}
