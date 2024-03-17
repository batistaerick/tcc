package com.erick.backend.domains.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MonthlySummaryDto {

    private String date;
    private Double expense;
    private Double income;
}
