package com.erick.backend.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.erick.backend.converters.TransactionConverter;
import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.domains.entities.Transaction;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.TransactionType;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.TransactionRepository;
import com.erick.backend.utils.UserSession;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class TransactionServiceTest {

    @Mock
    private TransactionRepository repository;

    @Mock
    private TransactionConverter converter;

    @Mock
    private UserService userService;

    @InjectMocks
    private TransactionService transactionService;

    @Test
    void save_ValidTransactionDto_SaveTransaction() {
        // Arrange
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            // Arrange
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);

            TransactionDto transactionDto = createMockTransactionDto();
            Transaction transaction = createMockTransaction();

            when(converter.dtoToEntity(transactionDto)).thenReturn(transaction);
            when(userService.findByEmail(authenticatedEmail))
                .thenReturn(createMockUser());
            when(repository.save(transaction)).thenReturn(transaction);
            when(converter.entityToDto(transaction)).thenReturn(transactionDto);

            // Act
            TransactionDto result = transactionService.save(transactionDto);

            // Assert
            assertNotNull(result);
            assertEquals(transactionDto, result);
            verify(repository, times(1)).save(transaction);
        }
    }

    @Test
    void delete_NonExistingTransaction_ThrowsGlobalException() {
        // Arrange
        UUID nonExistingTransactionId = UUID.randomUUID();

        when(repository.findById(nonExistingTransactionId))
            .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(
            GlobalException.class,
            () -> transactionService.delete(nonExistingTransactionId)
        );
        verify(repository, never()).deleteById(nonExistingTransactionId);
    }

    @Test
    void findDtoById_ExistingTransaction_ReturnsTransactionDto() {
        // Arrange
        UUID transactionId = UUID.randomUUID();
        Transaction existingTransaction = createMockTransaction();
        TransactionDto expectedTransactionDto = createMockTransactionDto();

        when(repository.findById(transactionId))
            .thenReturn(Optional.of(existingTransaction));
        when(converter.entityToDto(existingTransaction))
            .thenReturn(expectedTransactionDto);

        // Act
        TransactionDto result = transactionService.findDtoById(transactionId);

        // Assert
        assertNotNull(result);
        assertEquals(expectedTransactionDto, result);
    }

    @Test
    void findDtoById_NonExistingTransaction_ThrowsGlobalException() {
        // Arrange
        UUID nonExistingTransactionId = UUID.randomUUID();

        when(repository.findById(nonExistingTransactionId))
            .thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(
            GlobalException.class,
            () -> transactionService.findDtoById(nonExistingTransactionId)
        );
        verify(converter, never()).entityToDto(any());
    }

    @Test
    void findAllByTransactionType_ValidParameters_ReturnsListOfTransactionDto() {
        // Arrange
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            // Arrange
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            TransactionType transactionType = TransactionType.INCOME;

            when(
                repository.findByUserEmailAndTransactionType(
                    UserSession.getAuthenticatedEmail(),
                    transactionType
                )
            )
                .thenReturn(
                    Arrays.asList(
                        createMockTransaction(),
                        createMockTransaction()
                    )
                );

            when(converter.entityToDto(any(Transaction.class)))
                .thenReturn(createMockTransactionDto());

            // Act
            List<TransactionDto> result =
                transactionService.findAllByTransactionType(transactionType);

            // Assert
            assertNotNull(result);
            assertFalse(result.isEmpty());
            assertEquals(2, result.size());
        }
    }

    private TransactionDto createMockTransactionDto() {
        return TransactionDto
            .builder()
            .id(UUID.randomUUID())
            .transactionType(TransactionType.EXPENSE)
            .value(100.0)
            .build();
    }

    private Transaction createMockTransaction() {
        return Transaction
            .builder()
            .id(UUID.randomUUID())
            .transactionType(TransactionType.EXPENSE)
            .value(100.0)
            .user(createMockUser())
            .build();
    }

    private User createMockUser() {
        return User
            .builder()
            .id(UUID.randomUUID())
            .email("test@test.com")
            .build();
    }
}
