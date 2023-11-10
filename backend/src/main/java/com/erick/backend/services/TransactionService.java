package com.erick.backend.services;

import com.erick.backend.converters.TransactionConverter;
import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.TransactionType;
import com.erick.backend.exceptions.TransactionNotFoundException;
import com.erick.backend.exceptions.UnauthorizedTransactionDeletionException;
import com.erick.backend.repositories.TransactionRepository;
import com.erick.backend.utils.UserSession;
import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repository;
    private final TransactionConverter converter;
    private final UserService userService;

    public TransactionDto save(TransactionDto dto) {
        UUID id = userService
            .findByEmail(UserSession.getAuthenticatedEmail())
            .getId();
        Transaction transaction = converter.dtoToEntity(dto);
        transaction.setUser(
            User
                .builder()
                .id(id)
                .email(UserSession.getAuthenticatedEmail())
                .build()
        );
        return converter.entityToDto(repository.save(transaction));
    }

    public void delete(UUID id) {
        Transaction transaction = repository
            .findById(id)
            .orElseThrow(TransactionNotFoundException::new);
        if (
            !transaction
                .getUser()
                .getEmail()
                .equals(UserSession.getAuthenticatedEmail())
        ) {
            throw new UnauthorizedTransactionDeletionException(
                "Unauthorized attempt to delete a transaction that does not belong to the user."
            );
        }
        repository.deleteById(id);
    }

    public List<TransactionDto> findAllTransactionsByTypeAndDate(
        TransactionType transactionType,
        LocalDate startDate,
        LocalDate endDate
    ) {
        startDate = startDate.withDayOfMonth(1);
        endDate = endDate.withDayOfMonth(endDate.lengthOfMonth());

        return repository
            .findByUserEmailAndTransactionTypeAndDateBetween(
                UserSession.getAuthenticatedEmail(),
                transactionType,
                startDate,
                endDate
            )
            .stream()
            .map(converter::entityToDto)
            .toList();
    }

    public List<TransactionDto> findAllByTransactionType(
        TransactionType transactionType
    ) {
        return repository
            .findByUserEmailAndTransactionType(
                UserSession.getAuthenticatedEmail(),
                transactionType
            )
            .stream()
            .map(converter::entityToDto)
            .toList();
    }

    public Double predictRemainingBalance(LocalDate endDate) {
        LocalDate startDate = LocalDate.now().withDayOfMonth(1);
        double totalOfExpenses = totalOfTransactionsByTypeAndDate(
            TransactionType.EXPENSE,
            startDate,
            endDate
        );
        double totalOfIncomes = totalOfTransactionsByTypeAndDate(
            TransactionType.INCOME,
            startDate,
            endDate
        );
        double totalOfFixedExpenses = totalOfFixedTransactionsByType(
            TransactionType.FIXED_EXPENSE
        );
        double totalOfFixedIncomes = totalOfFixedTransactionsByType(
            TransactionType.FIXED_INCOME
        );

        int numberOfMonths = getNumberOfMonths(
            startDate.withDayOfMonth(1),
            endDate.withDayOfMonth(endDate.lengthOfMonth())
        );
        double totalIncome =
            totalOfIncomes + totalOfFixedIncomes * numberOfMonths;
        double totalExpense =
            totalOfExpenses + totalOfFixedExpenses * numberOfMonths;

        return totalIncome - totalExpense;
    }

    private Double totalOfTransactionsByTypeAndDate(
        TransactionType transactionType,
        LocalDate startDate,
        LocalDate endDate
    ) {
        return findAllTransactionsByTypeAndDate(
            transactionType,
            startDate,
            endDate
        )
            .stream()
            .mapToDouble(TransactionDto::getValue)
            .sum();
    }

    private Double totalOfFixedTransactionsByType(
        TransactionType transactionType
    ) {
        return findAllByTransactionType(transactionType)
            .stream()
            .mapToDouble(TransactionDto::getValue)
            .sum();
    }

    private Integer getNumberOfMonths(LocalDate startDate, LocalDate endDate) {
        int numberOfMonths = Period.between(startDate, endDate).getMonths();

        if (numberOfMonths <= 0) {
            return 1;
        }
        return numberOfMonths + 1;
    }
}
