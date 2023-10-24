package com.erick.backend.services;

import com.erick.backend.domains.entities.Role;
import com.erick.backend.enums.RoleName;
import com.erick.backend.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository repository;

    public Role findByRoleName(RoleName roleName) {
        return repository.findByRoleName(roleName);
    }
}
