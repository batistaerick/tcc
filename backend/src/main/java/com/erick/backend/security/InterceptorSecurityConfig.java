package com.erick.backend.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for setting up interceptors in the Spring MVC framework.
 * This class is responsible for registering custom interceptors for processing HTTP requests.
 */
@Configuration
@EnableWebMvc
public class InterceptorSecurityConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new RequestInterceptor());
    }
}
