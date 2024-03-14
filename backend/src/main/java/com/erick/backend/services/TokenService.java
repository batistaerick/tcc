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

/**
 * Service class for token-related operations.
 * This service is responsible for generating access and refresh tokens.
 */
@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtEncoder encoder;
    private final UserService userService;

    /**
     * Generates access and refresh tokens for a given authentication.
     * The method creates tokens with different expiration times and includes them in a UserDto,
     * which is then returned with token details.
     *
     * @param authentication The authentication object representing the currently authenticated user.
     * @return A UserDto containing access and refresh tokens along with their expiration details.
     */
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
        userDto.setRefreshToken(refreshToken);
        userDto.setTransactions(null);
        userDto.setPassword(null);
        userDto.setProfileImage(null);

        return userDto;
    }
}
