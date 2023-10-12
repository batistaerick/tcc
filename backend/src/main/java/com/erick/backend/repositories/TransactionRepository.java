package com.erick.backend.repositories;

import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.enums.TransactionType;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
    extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByUserEmailAndDateBetween(
        String userEmail,
        LocalDate startDate,
        LocalDate endDate
    );

    List<Transaction> findByUserEmailAndTransactionTypeAndDateBetween(
        String userEmail,
        TransactionType transactionType,
        LocalDate startDate,
        LocalDate endDate
    );

    List<Transaction> findByUserEmailAndTransactionType(
        String userEmail,
        TransactionType transactionType
    );
}
