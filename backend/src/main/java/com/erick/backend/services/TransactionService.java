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

    public TransactionDto save(Transaction transaction) {
        UUID id = userService
            .findByEmail(UserSession.getAuthenticatedEmail())
            .getId();
        transaction.setUser(
            User
                .builder()
                .id(id)
                .email(UserSession.getAuthenticatedEmail())
                .build()
        );
        return converter.entityToDto(repository.save(transaction));
    }

    public Transaction findById(UUID id) {
        return repository
            .findById(id)
            .orElseThrow(TransactionNotFoundException::new);
    }

    public void delete(UUID id) {
        Transaction transaction = findById(id);
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

    public List<TransactionDto> findByDateBetween(LocalDate endDate) {
        LocalDate startDate = endDate.withDayOfMonth(1);
        endDate = endDate.withDayOfMonth(endDate.lengthOfMonth());
        return repository
            .findByUserEmailAndDateBetween(
                UserSession.getAuthenticatedEmail(),
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
        endDate = endDate.withDayOfMonth(endDate.lengthOfMonth());
        String userEmail = UserSession.getAuthenticatedEmail();

        double totalOfExpenses = repository
            .findByUserEmailAndTransactionTypeAndDateBetween(
                userEmail,
                TransactionType.EXPENSE,
                startDate,
                endDate
            )
            .stream()
            .mapToDouble(Transaction::getValue)
            .sum();
        double totalOfIncomes = repository
            .findByUserEmailAndTransactionTypeAndDateBetween(
                userEmail,
                TransactionType.INCOME,
                startDate,
                endDate
            )
            .stream()
            .mapToDouble(Transaction::getValue)
            .sum();
        double totalOfFixedExpenses = findAllByTransactionType(
            TransactionType.FIXED_EXPENSE
        )
            .stream()
            .mapToDouble(TransactionDto::getValue)
            .sum();
        double totalOfFixedIncomes = findAllByTransactionType(
            TransactionType.FIXED_INCOME
        )
            .stream()
            .mapToDouble(TransactionDto::getValue)
            .sum();
        int numberOfMonths = getNumberOfMonths(startDate, endDate);

        return (
            (totalOfIncomes +
                totalOfFixedIncomes *
                    (numberOfMonths == 0 ? 1 : numberOfMonths)) -
            (totalOfExpenses +
                totalOfFixedExpenses *
                    (numberOfMonths == 0 ? 1 : numberOfMonths))
        );
    }

    private Integer getNumberOfMonths(LocalDate startDate, LocalDate endDate) {
        int numberOfMonths = Period.between(startDate, endDate).getMonths();

        if (numberOfMonths <= 0) {
            return 1;
        }
        return numberOfMonths + 1;
    }
}
