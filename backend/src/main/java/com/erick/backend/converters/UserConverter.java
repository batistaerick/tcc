package com.erick.backend.converters;

import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.User;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

/**
 * Converter class for converting between User entity and UserDto.
 * This class provides methods to convert User entities to DTOs and vice versa.
 */
@Component
public class UserConverter {

    /**
     * Converts a User entity to a UserDto.
     * This method maps the properties of the User entity to a new UserDto object.
     * It also converts associated roles and transactions if they are not null.
     *
     * @param entity The User entity to convert.
     * @return A UserDto object corresponding to the provided User entity.
     */
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

    /**
     * Converts a UserDto to a User entity.
     * This method maps the properties of the UserDto to a new User entity object.
     * It also converts associated roles and transactions if they are not null.
     *
     * @param dto The UserDto to convert.
     * @return A User entity corresponding to the provided UserDto.
     */
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
