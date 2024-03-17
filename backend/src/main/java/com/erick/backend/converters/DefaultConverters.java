package com.erick.backend.converters;

import com.erick.backend.domains.dtos.GoalDto;
import com.erick.backend.domains.dtos.RoleDto;
import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.Goal;
import com.erick.backend.domains.entities.Role;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.domains.entities.User;

/**
 * Utility class providing static methods to convert between DTOs and entities for roles, users, and transactions.
 * This class is not intended to be instantiated.
 */
public class DefaultConverters {

    /**
     * Private constructor to prevent instantiation of this utility class.
     *
     * @throws IllegalStateException if an attempt is made to instantiate this class.
     */
    private DefaultConverters() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * Converts a Role entity to a RoleDto.
     *
     * @param role The Role entity to convert.
     * @return A RoleDto corresponding to the Role entity.
     */
    public static RoleDto roleEntityToDto(Role role) {
        return RoleDto
            .builder()
            .id(role.getId())
            .roleName(role.getRoleName())
            .build();
    }

    /**
     * Converts a RoleDto to a Role entity.
     *
     * @param dto The RoleDto to convert.
     * @return A Role entity corresponding to the RoleDto.
     */
    public static Role roleDtoToEntity(RoleDto dto) {
        return Role
            .builder()
            .id(dto.getId())
            .roleName(dto.getRoleName())
            .build();
    }

    /**
     * Converts a User entity to a UserDto.
     *
     * @param user The User entity to convert.
     * @return A UserDto corresponding to the User entity.
     */
    public static UserDto userEntityToDto(User user) {
        return UserDto
            .builder()
            .id(user.getId())
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .middleName(user.getMiddleName())
            .email(user.getEmail())
            .password(user.getPassword())
            .profileImage(user.getProfileImage())
            .build();
    }

    /**
     * Converts a UserDto to a User entity.
     *
     * @param dto The UserDto to convert.
     * @return A User entity corresponding to the UserDto.
     */
    public static User userDtoToEntity(UserDto dto) {
        return User
            .builder()
            .id(dto.getId())
            .firstName(dto.getFirstName())
            .lastName(dto.getLastName())
            .middleName(dto.getMiddleName())
            .email(dto.getEmail())
            .password(dto.getPassword())
            .profileImage(dto.getProfileImage())
            .build();
    }

    /**
     * Converts a Transaction entity to a TransactionDto.
     *
     * @param entity The Transaction entity to convert.
     * @return A TransactionDto corresponding to the Transaction entity.
     */
    public static TransactionDto transactionEntityToDto(Transaction entity) {
        return TransactionDto
            .builder()
            .id(entity.getId())
            .category(entity.getCategory())
            .notes(entity.getNotes())
            .date(entity.getDate())
            .value(entity.getValue())
            .installments(entity.getInstallments())
            .transactionType(entity.getTransactionType())
            .repeats(entity.getRepeats())
            .build();
    }

    /**
     * Converts a TransactionDto to a Transaction entity.
     *
     * @param dto The TransactionDto to convert.
     * @return A Transaction entity corresponding to the TransactionDto.
     */
    public static Transaction transactionDtoToEntity(TransactionDto dto) {
        return Transaction
            .builder()
            .id(dto.getId())
            .category(dto.getCategory())
            .notes(dto.getNotes())
            .date(dto.getDate())
            .value(dto.getValue())
            .installments(dto.getInstallments())
            .transactionType(dto.getTransactionType())
            .repeats(dto.getRepeats())
            .build();
    }

    public static GoalDto goalEntityToDto(Goal entity) {
        return GoalDto
            .builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .description(entity.getDescription())
            .currentlyAmount(entity.getCurrentlyAmount())
            .targetAmount(entity.getTargetAmount())
            .startDate(entity.getStartDate())
            .endDate(entity.getEndDate())
            .build();
    }

    public static Goal transactionDtoToEntity(GoalDto dto) {
        return Goal
            .builder()
            .id(dto.getId())
            .title(dto.getTitle())
            .description(dto.getDescription())
            .currentlyAmount(dto.getCurrentlyAmount())
            .targetAmount(dto.getTargetAmount())
            .startDate(dto.getStartDate())
            .endDate(dto.getEndDate())
            .build();
    }
}
