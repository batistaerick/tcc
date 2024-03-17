package com.erick.backend.domains.dtos;

import java.time.LocalDate;
import java.util.UUID;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GoalDto {

    private UUID id;
    private UserDto user;
    private String title;
    private String description;
    private Double currentlyAmount;
    private Double targetAmount;
    private LocalDate startDate;
    private LocalDate endDate;
}
