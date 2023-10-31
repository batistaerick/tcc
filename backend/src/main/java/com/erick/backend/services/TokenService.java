package com.erick.backend.services;

import com.erick.backend.domains.dtos.UserDto;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtEncoder encoder;
    private final UserService userService;

    public UserDto generateTokens(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication
            .getAuthorities()
            .stream()
            .map(GrantedAuthority::getAuthority)
            .collect(Collectors.joining(" "));
        JwtClaimsSet accessTokenClaims = JwtClaimsSet
            .builder()
            .issuer("self")
            .issuedAt(now)
            .expiresAt(now.plus(1, ChronoUnit.HOURS))
            .subject(authentication.getName())
            .claim("scope", scope)
            .build();
        String accessToken =
            this.encoder.encode(JwtEncoderParameters.from(accessTokenClaims))
                .getTokenValue();

        JwtClaimsSet refreshTokenClaims = JwtClaimsSet
            .builder()
            .issuer("self")
            .issuedAt(now)
            .expiresAt(now.plus(7, ChronoUnit.DAYS))
            .subject(authentication.getName())
            .claim("scope", scope)
            .build();
        String refreshToken =
            this.encoder.encode(JwtEncoderParameters.from(refreshTokenClaims))
                .getTokenValue();

        UserDto userDto = userService.findByAuthenticatedEmail();
        userDto.setAccessToken(accessToken);
        userDto.setAccessTokenExpires(now.plus(1, ChronoUnit.HOURS));
        userDto.setRefreshToken(refreshToken);
        userDto.setRefreshTokenExpires(now.plus(7, ChronoUnit.DAYS));
        userDto.setTransactions(null);
        userDto.setPassword(null);

        return userDto;
    }
}
