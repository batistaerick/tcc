package com.erick.backend.domains.dtos;

import com.erick.backend.domains.entities.Image;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private UUID id;
    private String firstName;
    private String lastName;
    private String middleName;
    private String email;
    private String password;
    private Image profileImage;
    private String refreshToken;
    private String accessToken;
    private Set<RoleDto> roles = new HashSet<>();
    private List<TransactionDto> transactions;
    private List<GoalDto> goals;
}
