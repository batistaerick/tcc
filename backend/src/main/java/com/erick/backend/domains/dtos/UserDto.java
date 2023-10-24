package com.erick.backend.domains.dtos;

import java.time.Instant;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private UUID id;
    private String name;
    private String email;
    private String password;
    private byte[] profileImage;
    private String refreshToken;
    private Instant refreshTokenExpires;
    private String accessToken;
    private Instant accessTokenExpires;
    private Set<RoleDto> roles = new HashSet<>();
    private List<TransactionDto> transactions;
}
