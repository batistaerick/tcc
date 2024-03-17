package com.erick.backend.repositories;

import com.erick.backend.domains.dtos.MonthlySummaryDto;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.enums.TransactionType;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository
    extends JpaRepository<Transaction, UUID> {
    Page<
        Transaction
    > findByUserEmailAndTransactionTypeAndDateBetweenOrRepeatsIsNotNullAndTransactionType(
        String userEmail,
        TransactionType transactionType,
        LocalDate startDate,
        LocalDate endDate,
        TransactionType transactionTypeForRepeats,
        Pageable pageable
    );

    @Query(
        "SELECT new com.erick.backend.domains.dtos.MonthlySummaryDto(" +
        "concat(trim(to_char(t.date, 'MM')), '-', trim(to_char(t.date, 'YYYY'))) as date, " +
        "SUM(CASE WHEN t.transactionType = 'EXPENSE' THEN t.value ELSE 0 END) as expense, " +
        "SUM(CASE WHEN t.transactionType = 'INCOME' THEN t.value ELSE 0 END) as income) " +
        "FROM Transaction t " +
        "WHERE t.user.email = :userEmail " +
        "AND t.date BETWEEN :startDate AND :endDate " +
        "GROUP BY concat(trim(to_char(t.date, 'MM')), '-', trim(to_char(t.date, 'YYYY')))"
    )
    List<MonthlySummaryDto> getMonthlySummary(
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
