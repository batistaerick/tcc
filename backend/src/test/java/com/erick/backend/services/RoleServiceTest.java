package com.erick.backend.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.erick.backend.domains.entities.Role;
import com.erick.backend.enums.RoleName;
import com.erick.backend.repositories.RoleRepository;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class RoleServiceTest {

    @Mock
    private RoleRepository repository;

    @InjectMocks
    private RoleService roleService;

    @Test
    void findByRoleName_ExistingRole_ReturnsRole() {
        // Arrange
        RoleName roleName = RoleName.ROLE_USER;
        Role expectedRole = Role
            .builder()
            .id(UUID.randomUUID())
            .roleName(roleName)
            .build();
        when(repository.findByRoleName(roleName)).thenReturn(expectedRole);

        // Act
        Role result = roleService.findByRoleName(roleName);

        // Assert
        assertNotNull(result);
        assertEquals(expectedRole, result);
        verify(repository, times(1)).findByRoleName(roleName);
    }

    @Test
    void findByRoleName_NonExistingRole_ReturnsNull() {
        // Arrange
        RoleName roleName = RoleName.ROLE_ADMIN;
        when(repository.findByRoleName(roleName)).thenReturn(null);

        // Act
        Role result = roleService.findByRoleName(roleName);

        // Assert
        assertNull(result);
        verify(repository, times(1)).findByRoleName(roleName);
    }
}
