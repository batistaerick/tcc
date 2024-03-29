package com.erick.backend.domains.dtos;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticDto {

    private String path;
    private String country;
}
