package com.erick.backend.repositories;

import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.enums.TransactionType;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository
    extends JpaRepository<Transaction, UUID> {
    Page<Transaction> findByUserEmailAndTransactionTypeAndDateBetween(
        String userEmail,
        TransactionType transactionType,
        LocalDate startDate,
        LocalDate endDate,
        Pageable pageable
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
