package com.erick.backend.converters;

import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import org.springframework.stereotype.Component;

/**
 * Converter class for converting between Transaction entity and TransactionDto.
 * This class provides methods to convert Transaction entities to DTOs and vice versa.
 */
@Component
public class TransactionConverter {

    /**
     * Converts a Transaction entity to a TransactionDto.
     * This method maps the properties of the Transaction entity to a new TransactionDto object.
     * It also converts the associated user if it is not null.
     *
     * @param entity The Transaction entity to convert.
     * @return A TransactionDto object corresponding to the provided Transaction entity.
     */
    public TransactionDto entityToDto(Transaction entity) {
        TransactionDto dto = TransactionDto
            .builder()
            .id(entity.getId())
            .category(entity.getCategory())
            .notes(entity.getNotes())
            .date(entity.getDate())
            .value(entity.getValue())
            .transactionType(entity.getTransactionType())
            .build();
        if (entity.getUser() != null) {
            dto.setUser(DefaultConverters.userEntityToDto(entity.getUser()));
        }
        return dto;
    }

    /**
     * Converts a TransactionDto to a Transaction entity.
     * This method maps the properties of the TransactionDto to a new Transaction entity object.
     * It also converts the associated user if it is not null.
     *
     * @param dto The TransactionDto to convert.
     * @return A Transaction entity corresponding to the provided TransactionDto.
     */
    public Transaction dtoToEntity(TransactionDto dto) {
        Transaction entity = Transaction
            .builder()
            .id(dto.getId())
            .category(dto.getCategory())
            .notes(dto.getNotes())
            .date(dto.getDate())
            .value(dto.getValue())
            .transactionType(dto.getTransactionType())
            .build();
        if (dto.getUser() != null) {
            entity.setUser(DefaultConverters.userDtoToEntity(dto.getUser()));
        }
        return entity;
    }
}
