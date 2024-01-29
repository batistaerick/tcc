package com.erick.backend.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;

/**
 * Configuration class for message resources.
 * This class configures a message source for internationalization purposes.
 */
@Configuration
public class MessageConfig {

    /**
     * Creates a ResourceBundleMessageSource bean.
     * This bean is used for resolving messages from resource bundles for internationalization.
     *
     * @return A ResourceBundleMessageSource configured with the basename of the message properties files.
     */
    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource messageSource =
            new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        return messageSource;
    }
}
