package com.erick.backend.controllers;

import static org.springframework.http.ResponseEntity.noContent;

import com.erick.backend.domains.dtos.AnalyticDto;
import com.erick.backend.services.AnalyticService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing analytics.
 * This controller handles HTTP requests related to analytic operations such as saving analytics data.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/analytics")
public class AnalyticController {

    private final AnalyticService service;

    /**
     * Saves analytic data.
     *
     * @param dto The AnalyticDto containing the analytic data to be saved.
     * @return A ResponseEntity with HTTP status NO_CONTENT.
     */
    @PostMapping
    public ResponseEntity<Void> save(@RequestBody AnalyticDto dto) {
        service.save(dto);
        return noContent().build();
    }
}
