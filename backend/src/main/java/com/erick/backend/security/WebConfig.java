package com.erick.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for web-based configurations in the application.
 * This class is responsible for setting up CORS (Cross-Origin Resource Sharing) policies.
 */
@Configuration
public class WebConfig {

    /**
     * Configures CORS settings for the web application.
     * This bean defines the CORS mappings and configurations for the application.
     *
     * @return A {@link WebMvcConfigurer} object with custom CORS configuration.
     */
    @Bean
    public WebMvcConfigurer corsConfig() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry
                    .addMapping("/**")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedOrigins(
                        "http://localhost:3000",
                        "https://tcc-budget-manager.vercel.app"
                    );
            }
        };
    }
}
