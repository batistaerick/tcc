package com.erick.backend.services;

import com.erick.backend.domains.entities.Role;
import com.erick.backend.enums.RoleName;
import com.erick.backend.repositories.RoleRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository repository;

    public Role save(Role role) {
        return repository.save(role);
    }

    public List<Role> findAll() {
        return repository.findAll();
    }

    public Role findByRoleName(RoleName roleName) {
        return repository.findByRoleName(roleName);
    }
}
