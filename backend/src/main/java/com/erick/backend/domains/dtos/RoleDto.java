package com.erick.backend.domains.dtos;

import com.erick.backend.enums.RoleName;
import java.util.UUID;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {

    private UUID id;
    private RoleName roleName;
}
