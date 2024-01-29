package com.erick.backend.configs;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Development-only component for initializing the database.
 * This class implements CommandLineRunner to execute database initialization commands after the application starts.
 * It should not be used in a production environment as it directly manipulates the database.
 */
@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    /**
     * Runs SQL scripts upon application startup for initializing database.
     * This method currently inserts a default 'ROLE_USER' into the 't_role' table if it does not already exist.
     *
     * @param args Command line arguments passed to the application.
     */
    @Override
    public void run(String... args) {
        String sql =
            "INSERT INTO t_role (id, role_name) SELECT '2950b982-3f2a-46c0-8694-796ab4988b4b', 'ROLE_USER' " +
                "WHERE NOT EXISTS (SELECT 1 FROM t_role WHERE id = '2950b982-3f2a-46c0-8694-796ab4988b4b')";
        jdbcTemplate.update(sql);
    }
}
