package com.erick.backend.services;

import com.erick.backend.domains.dtos.AnalyticDto;
import com.erick.backend.domains.entities.Analytic;
import com.erick.backend.repositories.AnalyticRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service class for handling analytic-related operations.
 */
@Service
@RequiredArgsConstructor
public class AnalyticService {

    private final AnalyticRepository repository;

    /**
     * Saves analytic data.
     *
     * @param dto The AnalyticDto containing the analytic data to be saved.
     */
    public void save(AnalyticDto dto) {
        Analytic analytic = repository
            .findByPath(dto.getPath())
            .orElse(Analytic.builder().path(dto.getPath()).build());
        analytic.increaseValues(dto.getCountry());

        repository.save(analytic);
    }
}
