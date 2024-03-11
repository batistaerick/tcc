package com.erick.backend.controllers;

import static org.springframework.http.ResponseEntity.*;

import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.enums.TransactionType;
import com.erick.backend.services.TransactionService;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing transactions.
 * This controller handles HTTP requests related to transaction operations such as creating, deleting, and retrieving transaction details.
 */
@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService service;

    /**
     * Creates a new transaction.
     *
     * @param transaction The TransactionDto containing the information for the new transaction.
     * @return A ResponseEntity with the created TransactionDto and the URI of the newly created transaction.
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<TransactionDto> save(
        @RequestBody TransactionDto transaction
    ) {
        TransactionDto transactionDto = service.save(transaction);
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(transactionDto.getId())
            .toUri();
        return created(uri).body(transactionDto);
    }

    /**
     * Updates an existing transaction.
     *
     * @param transaction The TransactionDto containing the updated information.
     * @return A ResponseEntity with the updated TransactionDto.
     */
    @PutMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<TransactionDto> put(
        @RequestBody TransactionDto transaction
    ) {
        TransactionDto transactionDto = service.put(transaction);
        return ok(transactionDto);
    }

    /**
     * Deletes a transaction by its ID.
     *
     * @param id The UUID of the transaction to be deleted.
     * @return A ResponseEntity with HTTP status NO_CONTENT.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return noContent().build();
    }

    /**
     * Retrieves all transactions of a specific type within a date range.
     *
     * @param startDate       The start date of the range.
     * @param endDate         The end date of the range.
     * @param transactionType The type of transactions to retrieve.
     * @return A ResponseEntity containing a list of TransactionDtos.
     */
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<
        Page<Transaction>
    > findByUserEmailAndTransactionTypeAndDateBetween(
        @RequestParam LocalDate startDate,
        @RequestParam LocalDate endDate,
        @RequestParam TransactionType transactionType,
        Pageable pageable
    ) {
        Page<Transaction> transactions =
            service.findByUserEmailAndTransactionTypeAndDateBetween(
                transactionType,
                startDate,
                endDate,
                pageable
            );
        return ok(transactions);
    }

    /**
     * Retrieves a transaction by its ID.
     *
     * @param id The UUID of the transaction to retrieve.
     * @return A ResponseEntity containing the TransactionDto.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<TransactionDto> findDtoById(@PathVariable UUID id) {
        TransactionDto dto = service.findDtoById(id);
        return ok(dto);
    }

    /**
     * Retrieves all transactions of a specific type.
     *
     * @param transactionType The type of transactions to retrieve.
     * @return A ResponseEntity containing a list of TransactionDtos.
     */
    @GetMapping("/{transactionType}/fixed")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<List<TransactionDto>> findByUserEmailAndDateBetween(
        @PathVariable TransactionType transactionType
    ) {
        List<TransactionDto> transactions = service.findAllByTransactionType(
            transactionType
        );
        return ok(transactions);
    }

    /**
     * Predicts the remaining balance by a specified end date.
     *
     * @param endDate The end date for which the balance is predicted.
     * @return A ResponseEntity containing the predicted balance as Double.
     */
    @GetMapping("/{endDate}/prediction")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Double> predictRemainingBalance(
        @PathVariable LocalDate endDate
    ) {
        Double prediction = service.predictRemainingBalance(endDate);
        return ok(prediction);
    }
}
