package com.erick.backend.controllers;

import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.enums.TransactionType;
import com.erick.backend.services.TransactionService;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService service;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<TransactionDto> save(
        @RequestBody Transaction transaction
    ) {
        TransactionDto transactionDto = service.save(transaction);
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(transaction.getId())
            .toUri();
        return ResponseEntity.created(uri).body(transactionDto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{endDate}/between-dates")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<TransactionDto>> findByUserEmailAndDateBetween(
        @PathVariable LocalDate endDate
    ) {
        List<TransactionDto> transactions = service.findByDateBetween(endDate);
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{transactionType}/fixed")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<List<TransactionDto>> findByUserEmailAndDateBetween(
        @PathVariable TransactionType transactionType
    ) {
        List<TransactionDto> transactions = service.findAllByTransactionType(
            transactionType
        );
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{endDate}/prediction")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Double> predictRemainingBalance(
        @PathVariable LocalDate endDate
    ) {
        Double prediction = service.predictRemainingBalance(endDate);
        return ResponseEntity.ok(prediction);
    }
}
