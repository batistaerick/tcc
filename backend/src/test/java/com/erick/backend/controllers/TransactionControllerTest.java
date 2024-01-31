package com.erick.backend.controllers;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.erick.backend.domains.dtos.TransactionDto;
import com.erick.backend.enums.TransactionType;
import com.erick.backend.services.TransactionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@ExtendWith(SpringExtension.class)
@WebMvcTest(TransactionController.class)
class TransactionControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TransactionService service;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    public void setup() {
        mockMvc =
            MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    @WithMockUser(roles = "USER")
    void testSaveTransaction() throws Exception {
        TransactionDto transaction = new TransactionDto();
        TransactionDto savedTransaction = new TransactionDto();

        given(service.save(any(TransactionDto.class)))
            .willReturn(savedTransaction);

        mockMvc
            .perform(
                post("/transactions")
                    .with(jwt())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(transaction))
            )
            .andExpect(status().isCreated())
            .andExpect(header().exists("Location"))
            .andExpect(jsonPath("$.id").value(savedTransaction.getId()));
        verify(service).save(any(TransactionDto.class));
    }

    @Test
    @WithMockUser(roles = "USER")
    void testDeleteTransaction() throws Exception {
        UUID id = UUID.randomUUID();

        doNothing().when(service).delete(id);

        mockMvc
            .perform(delete("/transactions/" + id).with(jwt()))
            .andExpect(status().isNoContent());
        verify(service).delete(id);
    }

    @Test
    @WithMockUser(roles = "USER")
    void testFindAllTransactions() throws Exception {
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = LocalDate.now();
        TransactionType type = TransactionType.EXPENSE;
        List<TransactionDto> transactions = Arrays.asList(
            new TransactionDto(),
            new TransactionDto()
        );

        given(
            service.findAllTransactionsByTypeAndDate(type, startDate, endDate)
        )
            .willReturn(transactions);

        mockMvc
            .perform(
                get("/transactions")
                    .with(jwt())
                    .param("startDate", startDate.toString())
                    .param("endDate", endDate.toString())
                    .param("transactionType", type.toString())
            )
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.size()").value(transactions.size()));
        verify(service)
            .findAllTransactionsByTypeAndDate(type, startDate, endDate);
    }

    @Test
    @WithMockUser(roles = "USER")
    void testFindTransactionById() throws Exception {
        UUID id = UUID.randomUUID();
        TransactionDto transaction = new TransactionDto();

        given(service.findDtoById(id)).willReturn(transaction);

        mockMvc
            .perform(get("/transactions/" + id).with(jwt()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(transaction.getId()));
        verify(service).findDtoById(id);
    }

    @Test
    @WithMockUser(roles = "USER")
    void testFindByUserEmailAndDateBetween() throws Exception {
        TransactionType type = TransactionType.INCOME;
        List<TransactionDto> transactions = Arrays.asList(
            new TransactionDto(),
            new TransactionDto()
        );

        given(service.findAllByTransactionType(type)).willReturn(transactions);

        mockMvc
            .perform(get("/transactions/" + type + "/fixed").with(jwt()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.size()").value(transactions.size()));
        verify(service).findAllByTransactionType(type);
    }

    @Test
    @WithMockUser(roles = "USER")
    void testPredictRemainingBalance() throws Exception {
        LocalDate endDate = LocalDate.now();
        Double prediction = 100.0d;

        given(service.predictRemainingBalance(endDate)).willReturn(prediction);

        mockMvc
            .perform(
                get("/transactions/" + endDate + "/prediction").with(jwt())
            )
            .andExpect(status().isOk())
            .andExpect(content().string(prediction.toString()));
        verify(service).predictRemainingBalance(endDate);
    }
}
