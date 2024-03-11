package com.erick.backend.controllers;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

import com.erick.backend.domains.dtos.AnalyticDto;
import com.erick.backend.domains.entities.Analytic;
import com.erick.backend.services.AnalyticService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Analytic>> findAll() {
        List<Analytic> analytic = service.findAll();
        return ok(analytic);
    }
}
