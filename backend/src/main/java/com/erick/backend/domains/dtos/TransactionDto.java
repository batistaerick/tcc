package com.erick.backend.domains.dtos;

import com.erick.backend.enums.TransactionType;
import java.time.LocalDate;
import java.util.UUID;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionDto {

    private UUID id;
    private UserDto user;
    private String category;
    private String notes;
    private LocalDate date;
    private Double value;
    private TransactionType transactionType;
}
