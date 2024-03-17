package com.erick.backend.domains.entities;

import com.erick.backend.enums.Repeats;
import com.erick.backend.enums.TransactionType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;
import lombok.*;

@Table(name = "t_transaction")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private User user;

    @NotBlank(message = "Category cannot be blank!")
    @NotNull(message = "Category cannot be null!")
    private String category;

    private String notes;

    private LocalDate date;

    @NotNull(message = "Amount cannot be null!")
    private Double value;

    @Max(value = 1000, message = "Installments cannot be more than 1000!")
    private Integer installments;

    @NotNull(message = "Transaction type cannot be null!")
    @Enumerated(EnumType.STRING)
    private TransactionType transactionType;

    @Enumerated(EnumType.STRING)
    private Repeats repeats;
}
