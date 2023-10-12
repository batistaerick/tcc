package com.erick.backend.domains.dtos;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private UUID id;
    private String name;
    private String email;
    private String password;
    private byte[] profileImage;
    private String refreshToken;
    private String accessToken;
    private Set<RoleDto> roles = new HashSet<>();
    private List<TransactionDto> transactions;
}
