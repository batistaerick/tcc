package com.erick.backend.repositories;

import com.erick.backend.domains.entities.Goal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, UUID> {
    List<
        Goal
    > findByUserEmailAndStartDateGreaterThanEqualAndEndDateLessThanEqual(
        String userEmail,
        LocalDate startDate,
        LocalDate endDate
    );
}
