package com.erick.backend.converters;

import com.erick.backend.domains.dtos.RoleDto;
import com.erick.backend.domains.entities.Role;
import org.springframework.stereotype.Component;

/**
 * Converter class for converting between Role entity and RoleDto.
 * This class provides methods to convert Role entities to DTOs and vice versa, facilitating data transformation between different layers of the application.
 */
@Component
public class RoleConverter {

    /**
     * Converts a Role entity to a RoleDto.
     * This method maps the properties of the Role entity to a new RoleDto object.
     *
     * @param entity The Role entity to convert.
     * @return A RoleDto object corresponding to the provided Role entity.
     */
    public RoleDto entityToDto(Role entity) {
        return RoleDto
            .builder()
            .id(entity.getId())
            .roleName(entity.getRoleName())
            .build();
    }

    /**
     * Converts a RoleDto to a Role entity.
     * This method maps the properties of the RoleDto to a new Role entity object.
     *
     * @param dto The RoleDto to convert.
     * @return A Role entity corresponding to the provided RoleDto.
     */
    public Role dtoToEntity(RoleDto dto) {
        return Role
            .builder()
            .id(dto.getId())
            .roleName(dto.getRoleName())
            .build();
    }
}
