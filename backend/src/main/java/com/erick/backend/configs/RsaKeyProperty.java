package com.erick.backend.configs;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "rsa")
public record RsaKeyProperty(
    RSAPublicKey publicKey,
    RSAPrivateKey privateKey
) {}
