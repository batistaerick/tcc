package com.erick.backend.converters;

import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.User;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public UserDto entityToDto(User entity) {
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setEmail(entity.getEmail());
        dto.setPassword(entity.getPassword());
        dto.setProfileImage(entity.getProfileImage());
        if (entity.getRoles() != null) {
            dto.setRoles(
                entity
                    .getRoles()
                    .stream()
                    .map(DefaultConverters::roleEntityToDto)
                    .collect(Collectors.toSet())
            );
        }
        if (entity.getTransactions() != null) {
            dto.setTransactions(
                entity
                    .getTransactions()
                    .stream()
                    .map(DefaultConverters::transactionEntityToDto)
                    .toList()
            );
        }
        return dto;
    }
}
