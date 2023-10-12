package com.erick.backend.converters;

import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import org.springframework.stereotype.Component;

@Component
public class TransactionConverter {

    public TransactionDto entityToDto(Transaction entity) {
        TransactionDto dto = new TransactionDto();
        dto.setId(entity.getId());
        dto.setUser(DefaultConverters.userEntityToDto(entity.getUser()));
        dto.setCategory(entity.getCategory());
        dto.setNotes(entity.getNotes());
        dto.setDate(entity.getDate());
        dto.setValue(entity.getValue());
        dto.setTransactionType(entity.getTransactionType());

        return dto;
    }
}
