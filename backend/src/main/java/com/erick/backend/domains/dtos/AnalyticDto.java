package com.erick.backend.domains.dtos;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticDto {

    private String path;
    private String country;
}
