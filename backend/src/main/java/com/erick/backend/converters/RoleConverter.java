package com.erick.backend.converters;

import com.erick.backend.domains.dtos.RoleDto;
import com.erick.backend.domains.entities.Role;
import org.springframework.stereotype.Component;

@Component
public class RoleConverter {

    public RoleDto entityToDto(Role entity) {
        return RoleDto
            .builder()
            .id(entity.getId())
            .roleName(entity.getRoleName())
            .build();
    }

    public Role dtoToEntity(RoleDto dto) {
        return Role
            .builder()
            .id(dto.getId())
            .roleName(dto.getRoleName())
            .build();
    }
}
