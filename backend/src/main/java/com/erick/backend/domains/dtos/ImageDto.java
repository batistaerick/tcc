package com.erick.backend.domains.dtos;

import java.sql.Blob;
import java.util.UUID;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageDto {

    private UUID id;
    private String name;
    private String type;
    private Blob profileImage;
    private UserDto user;
}
