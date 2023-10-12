package com.erick.backend.domains.entities;

import com.erick.backend.enums.TransactionType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "t_transaction")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @NotNull(message = "Transaction type cannot be null!")
    private TransactionType transactionType;
}
