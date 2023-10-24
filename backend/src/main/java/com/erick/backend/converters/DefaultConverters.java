package com.erick.backend.converters;

import com.erick.backend.domains.dtos.RoleDto;
import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.Role;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.domains.entities.User;

public class DefaultConverters {

    private DefaultConverters() {
        throw new IllegalStateException("Utility class");
    }

    public static RoleDto roleEntityToDto(Role role) {
        return RoleDto
            .builder()
            .id(role.getId())
            .roleName(role.getRoleName())
            .build();
    }

    public static Role roleDtoToEntity(RoleDto dto) {
        return Role
            .builder()
            .id(dto.getId())
            .roleName(dto.getRoleName())
            .build();
    }

    public static UserDto userEntityToDto(User user) {
        return UserDto
            .builder()
            .id(user.getId())
            .name(user.getName())
            .email(user.getEmail())
            .password(user.getPassword())
            .profileImage(user.getProfileImage())
            .build();
    }

    public static User userDtoToEntity(UserDto dto) {
        return User
            .builder()
            .id(dto.getId())
            .name(dto.getName())
            .email(dto.getEmail())
            .password(dto.getPassword())
            .profileImage(dto.getProfileImage())
            .build();
    }

    public static TransactionDto transactionEntityToDto(
        Transaction transaction
    ) {
        return TransactionDto
            .builder()
            .id(transaction.getId())
            .category(transaction.getCategory())
            .notes(transaction.getNotes())
            .date(transaction.getDate())
            .value(transaction.getValue())
            .transactionType(transaction.getTransactionType())
            .build();
    }

    public static Transaction transactionDtoToEntity(TransactionDto dto) {
        return Transaction
            .builder()
            .id(dto.getId())
            .category(dto.getCategory())
            .notes(dto.getNotes())
            .date(dto.getDate())
            .value(dto.getValue())
            .transactionType(dto.getTransactionType())
            .build();
    }
}
