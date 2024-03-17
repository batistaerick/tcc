package com.erick.backend.domains.dtos;

import com.erick.backend.enums.RoleName;
import java.util.UUID;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {

    private UUID id;
    private RoleName roleName;
}
