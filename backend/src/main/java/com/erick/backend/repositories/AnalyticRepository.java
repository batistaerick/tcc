package com.erick.backend.repositories;

import com.erick.backend.domains.entities.Analytic;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnalyticRepository extends JpaRepository<Analytic, UUID> {
    Optional<Analytic> findByPath(String path);

    @Query(
        "SELECT a FROM Analytic a JOIN a.accesses acc WHERE KEY(acc) BETWEEN :startDate AND :endDate"
    )
    List<Analytic> findByAccessesBetween(
        LocalDate startDate,
        LocalDate endDate
    );
}
