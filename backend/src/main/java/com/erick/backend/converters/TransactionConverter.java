package com.erick.backend.converters;

import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionConverter {

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
