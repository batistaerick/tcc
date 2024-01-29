package com.erick.backend.services;

import com.erick.backend.domains.entities.Role;
import com.erick.backend.enums.RoleName;
import com.erick.backend.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service class for managing role-related operations.
 * This service is primarily responsible for retrieving role information from the repository.
 */
@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository repository;

    /**
     * Finds a role entity based on the provided role name.
     *
     * @param roleName The name of the role to be found.
     * @return The Role entity associated with the given roleName.
     */
    public Role findByRoleName(RoleName roleName) {
        return repository.findByRoleName(roleName);
    }
}
