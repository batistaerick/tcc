package com.erick.backend.repositories;

import com.erick.backend.domains.entities.Role;
import com.erick.backend.enums.RoleName;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Role findByRoleName(RoleName roleName);
}
