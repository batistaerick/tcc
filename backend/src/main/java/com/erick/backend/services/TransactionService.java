package com.erick.backend.services;

import com.erick.backend.converters.TransactionConverter;
import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.I18nCode;
import com.erick.backend.enums.TransactionType;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.TransactionRepository;
import com.erick.backend.utils.UserSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.UUID;

/**
 * Service class for managing transaction-related operations.
 * This includes saving, deleting, finding, and predicting transactions.
 */
@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository repository;
    private final TransactionConverter converter;
    private final UserService userService;

    /**
     * Saves a new transaction to the repository.
     *
     * @param dto The TransactionDto object containing transaction information to be saved.
     * @return The saved TransactionDto.
     */
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

    /**
     * Deletes a transaction by its ID.
     *
     * @param id The UUID of the transaction to be deleted.
     * @throws GlobalException if the transaction is not found or if an unauthorized user attempts deletion.
     */
    public void delete(UUID id) {
        Transaction transaction = repository
            .findById(id)
            .orElseThrow(() ->
                new GlobalException(
                    HttpStatus.NOT_FOUND,
                    I18nCode.TRANSACTION_NOT_FOUND,
                    "Transaction not found for id {}",
                    id
                )
            );
        String email = UserSession.getAuthenticatedEmail();
        boolean isSameEmail = transaction.getUser().getEmail().equals(email);

        if (!isSameEmail) {
            throw new GlobalException(
                HttpStatus.UNAUTHORIZED,
                I18nCode.UNAUTHORIZED_DELETION,
                "Unauthorized attempt to delete a transaction that does not belong to the user {}",
                email
            );
        }
        repository.deleteById(id);
    }

    /**
     * Finds a transaction DTO by its ID.
     *
     * @param id The UUID of the transaction to be found.
     * @return The TransactionDto of the requested transaction.
     * @throws GlobalException if the transaction is not found.
     */
    public TransactionDto findDtoById(UUID id) {
        return repository
            .findById(id)
            .map(converter::entityToDto)
            .orElseThrow(() ->
                new GlobalException(
                    HttpStatus.NOT_FOUND,
                    I18nCode.TRANSACTION_NOT_FOUND,
                    "Transaction not found for id {}",
                    id
                )
            );
    }

    /**
     * Finds all transactions of a specified type within a date range.
     *
     * @param transactionType The type of transactions to find.
     * @param startDate       The start date of the range.
     * @param endDate         The end date of the range.
     * @return A list of TransactionDto objects.
     */
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

    /**
     * Finds all transactions of a specified type.
     *
     * @param transactionType The type of transactions to find.
     * @return A list of TransactionDto objects.
     */
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

    /**
     * Predicts the remaining balance by a specified end date.
     *
     * @param endDate The end date to predict the balance for.
     * @return The predicted balance as a Double.
     */
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
