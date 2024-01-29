package com.erick.backend.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.erick.backend.converters.UserConverter;
import com.erick.backend.domains.dtos.RoleDto;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.Role;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.RoleName;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.UserRepository;
import com.erick.backend.utils.UserSession;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository repository;

    @Mock
    private UserConverter converter;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private RoleService roleService;

    @InjectMocks
    private UserService service;

    private User user;
    private UserDto userDto;

    @BeforeEach
    void setUp() {
        user =
            User
                .builder()
                .id(UUID.randomUUID())
                .email("test@test.com")
                .password("Password@123")
                .name("Test")
                .roles(
                    Set.of(
                        Role
                            .builder()
                            .id(UUID.randomUUID())
                            .roleName(RoleName.ROLE_USER)
                            .build()
                    )
                )
                .build();
        userDto =
            UserDto
                .builder()
                .id(UUID.randomUUID())
                .email("test@test.com")
                .password("Password@123")
                .name("Test")
                .roles(
                    Set.of(
                        RoleDto
                            .builder()
                            .id(UUID.randomUUID())
                            .roleName(RoleName.ROLE_USER)
                            .build()
                    )
                )
                .build();
    }

    @Test
    void findByEmail_ExistingEmail() {
        // Arrange
        String userEmail = "test@test.com";
        User expectedUser = new User();
        when(repository.findByEmail(userEmail))
            .thenReturn(Optional.of(expectedUser));

        // Act
        User result = service.findByEmail(userEmail);

        // Assert
        assertEquals(expectedUser, result);
        verify(repository, times(1)).findByEmail(userEmail);
    }

    @Test
    void findByEmail_NonExistingEmail_ThrowsGlobalException() {
        // Arrange
        String userEmail = "nonexistent@test.com";
        when(repository.findByEmail(userEmail)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(
            GlobalException.class,
            () -> service.findByEmail(userEmail)
        );
        verify(repository, times(1)).findByEmail(userEmail);
    }

    @Test
    void save_NewUser() {
        User expectedUser = User
            .builder()
            .email("test@test.com")
            .password("hashedPassword")
            .build();
        UserDto expectedUserDto = UserDto
            .builder()
            .email("test@test.com")
            .password("hashedPassword")
            .build();
        // Arrange
        when(repository.findByEmail(userDto.getEmail()))
            .thenReturn(Optional.empty());
        when(repository.save(user)).thenReturn(expectedUser);
        when(converter.dtoToEntity(userDto)).thenReturn(user);
        when(service.save(userDto)).thenReturn(expectedUserDto);
        when(passwordEncoder.encode(userDto.getPassword()))
            .thenReturn("hashedPassword");
        when(roleService.findByRoleName(RoleName.ROLE_USER))
            .thenReturn(new Role());

        // Act
        UserDto result = service.save(userDto);

        // Assert
        assertEquals(expectedUserDto, result);
        verify(repository, times(2)).findByEmail(userDto.getEmail());
        verify(repository, times(2)).save(user);
        verify(converter, times(2)).dtoToEntity(userDto);
        verify(passwordEncoder, times(2)).encode(userDto.getPassword());
        verify(roleService, times(2)).findByRoleName(RoleName.ROLE_USER);
    }

    @Test
    void save_ExistingEmail_ThrowsGlobalException() {
        // Arrange
        UserDto existingUserDto = new UserDto();
        existingUserDto.setEmail("existing@example.com");
        existingUserDto.setPassword("password");

        when(repository.findByEmail(existingUserDto.getEmail()))
            .thenReturn(Optional.of(new User()));

        // Act & Assert
        assertThrows(
            GlobalException.class,
            () -> service.save(existingUserDto)
        );
        verify(repository, times(1)).findByEmail(existingUserDto.getEmail());
    }

    @Test
    void findByAuthenticatedEmail_ValidAuthenticatedEmail_ReturnsUserDto() {
        // Arrange
        String authenticatedEmail = "test@test.com";
        userDto.setPassword(null);
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            assertEquals(
                UserSession.getAuthenticatedEmail(),
                authenticatedEmail
            );
            when(converter.entityToDto(user)).thenReturn(userDto);
            when(repository.findByEmail(authenticatedEmail))
                .thenReturn(Optional.of(user));

            // Act
            UserDto result = service.findByAuthenticatedEmail();

            // Assert
            assertNotNull(result);
            assertEquals(authenticatedEmail, result.getEmail());
            assertEquals(userDto, result);
            verify(repository, times(1)).findByEmail(authenticatedEmail);
            verify(converter, times(1)).entityToDto(user);
        }
    }

    @Test
    void update_ValidUpdatedUser_UpdatesUser() {
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            // Arrange
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            User existingUser = new User();
            existingUser.setEmail(authenticatedEmail);
            existingUser.setName("OldName");
            existingUser.setPassword("oldPassword");

            UserDto updatedUserDto = new UserDto();
            updatedUserDto.setName("NewName");
            updatedUserDto.setPassword("Password@123");

            when(repository.findByEmail(authenticatedEmail))
                .thenReturn(Optional.of(existingUser));
            when(passwordEncoder.encode(updatedUserDto.getPassword()))
                .thenReturn("hashedNewPassword");

            // Act
            service.update(updatedUserDto);

            // Assert
            verify(repository, times(1)).save(existingUser);
            assertEquals("NewName", existingUser.getName());
            assertEquals("hashedNewPassword", existingUser.getPassword());
        }
    }

    @Test
    void update_BlankNameAndPassword_NoUpdates() {
        // Arrange
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            // Arrange
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            User existingUser = new User();
            existingUser.setEmail(authenticatedEmail);
            existingUser.setName("OldName");
            existingUser.setPassword("oldPassword");

            UserDto updatedUserDto = new UserDto(); // Empty values

            when(repository.findByEmail(authenticatedEmail))
                .thenReturn(Optional.of(existingUser));

            // Act
            service.update(updatedUserDto);

            // Assert
            verify(repository, times(1)).findByEmail(authenticatedEmail);
            assertEquals("OldName", existingUser.getName());
            assertEquals("oldPassword", existingUser.getPassword());
        }
    }

    @Test
    void update_InvalidPassword_ThrowsGlobalException() {
        // Arrange
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            // Arrange
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            User existingUser = new User();
            existingUser.setEmail(authenticatedEmail);
            existingUser.setName("OldName");
            existingUser.setPassword("oldPassword");

            UserDto updatedUserDto = new UserDto();
            updatedUserDto.setPassword("short"); // Invalid password

            when(repository.findByEmail(authenticatedEmail))
                .thenReturn(Optional.of(existingUser));

            // Act & Assert
            assertThrows(
                GlobalException.class,
                () -> service.update(updatedUserDto)
            );
            verify(repository, never()).save(existingUser);
        }
    }

    @Test
    void update_PasswordProvided_PasswordIsUpdated() {
        // Arrange
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            // Arrange
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            User existingUser = new User();
            existingUser.setEmail(authenticatedEmail);
            existingUser.setName("OldName");
            existingUser.setPassword("Password@123");

            UserDto updatedUserDto = new UserDto();
            updatedUserDto.setPassword("Password@123");

            when(repository.findByEmail(authenticatedEmail))
                .thenReturn(Optional.of(existingUser));
            when(passwordEncoder.encode(updatedUserDto.getPassword()))
                .thenReturn("hashedNewPassword");

            // Act
            service.update(updatedUserDto);

            // Assert
            verify(repository, times(1)).save(existingUser);
            assertEquals("hashedNewPassword", existingUser.getPassword());
        }
    }

    @Test
    void update_NameProvided_NameIsUpdated() {
        // Arrange
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            // Arrange
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            User existingUser = new User();
            existingUser.setEmail(authenticatedEmail);
            existingUser.setName("OldName");
            existingUser.setPassword("oldPassword");

            UserDto updatedUserDto = new UserDto();
            updatedUserDto.setName("NewName");

            when(repository.findByEmail(authenticatedEmail))
                .thenReturn(Optional.of(existingUser));

            // Act
            service.update(updatedUserDto);

            // Assert
            verify(repository, times(1)).save(existingUser);
            assertEquals("NewName", existingUser.getName());
        }
    }
}
