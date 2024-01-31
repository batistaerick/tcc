package com.erick.backend.security;

import static org.springframework.security.config.Customizer.withDefaults;

import com.erick.backend.configs.RsaKeyProperty;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Security configuration class for the Spring Security framework.
 * This class configures JWT token handling, CORS, CSRF, and other security-related aspects of the application.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final RsaKeyProperty rsaKeys;

    /**
     * Defines the security filter chain for the application.
     * This method configures CORS, CSRF, session management, and authorization rules for the application.
     *
     * @param http The HttpSecurity to configure.
     * @return The configured SecurityFilterChain.
     * @throws Exception if an error occurs during the configuration.
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
        throws Exception {
        return http
            .cors(withDefaults())
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(authorization ->
                authorization
                    .requestMatchers(
                        "/api-doc",
                        "/v3/api-docs/**",
                        "/swagger-ui.html",
                        "/swagger-ui/**"
                    )
                    .permitAll()
                    .requestMatchers(HttpMethod.POST, "/users")
                    .permitAll()
                    .anyRequest()
                    .authenticated()
            )
            .oauth2ResourceServer(oauth2ResourceServer ->
                oauth2ResourceServer.jwt(withDefaults())
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .httpBasic(withDefaults())
            .build();
    }

    /**
     * Provides the JWT decoder bean configured with the application's public key.
     *
     * @return A JwtDecoder instance.
     */
    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaKeys.publicKey()).build();
    }

    /**
     * Provides the JWT encoder bean configured with the application's RSA keys.
     *
     * @return A JwtEncoder instance.
     */
    @Bean
    JwtEncoder jwtEncoder() {
        JWK jwk = new RSAKey.Builder(rsaKeys.publicKey())
            .privateKey(rsaKeys.privateKey())
            .build();
        JWKSource<SecurityContext> jwks = new ImmutableJWKSet<>(
            new JWKSet(jwk)
        );
        return new NimbusJwtEncoder(jwks);
    }

    /**
     * Creates a password encoder bean that uses BCrypt hashing algorithm.
     *
     * @return A PasswordEncoder instance.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
