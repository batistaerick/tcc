package com.erick.backend.repositories;

import com.erick.backend.domains.entities.Analytic;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyticRepository extends JpaRepository<Analytic, UUID> {
    Optional<Analytic> findByPath(String path);
}
