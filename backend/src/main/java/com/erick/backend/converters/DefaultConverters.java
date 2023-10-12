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
        return new RoleDto(role.getId(), role.getRoleName());
    }

    public static UserDto userEntityToDto(User user) {
        return new UserDto(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getPassword(),
            null,
            null,
            null,
            null,
            null
        );
    }

    public static TransactionDto transactionEntityToDto(
        Transaction transaction
    ) {
        return new TransactionDto(
            transaction.getId(),
            null,
            transaction.getCategory(),
            transaction.getNotes(),
            transaction.getDate(),
            transaction.getValue(),
            transaction.getTransactionType()
        );
    }
}
