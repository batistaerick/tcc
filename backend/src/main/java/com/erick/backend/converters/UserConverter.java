package com.erick.backend.converters;

import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.User;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class UserConverter {

    public UserDto entityToDto(User entity) {
        UserDto dto = UserDto
            .builder()
            .id(entity.getId())
            .name(entity.getName())
            .email(entity.getEmail())
            .password(entity.getPassword())
            .build();
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

    public User dtoToEntity(UserDto dto) {
        User entity = User
            .builder()
            .id(dto.getId())
            .name(dto.getName())
            .email(dto.getEmail())
            .password(dto.getPassword())
            .build();
        if (dto.getRoles() != null) {
            entity.setRoles(
                dto
                    .getRoles()
                    .stream()
                    .map(DefaultConverters::roleDtoToEntity)
                    .collect(Collectors.toSet())
            );
        }
        if (dto.getTransactions() != null) {
            entity.setTransactions(
                dto
                    .getTransactions()
                    .stream()
                    .map(DefaultConverters::transactionDtoToEntity)
                    .toList()
            );
        }
        return entity;
    }
}
