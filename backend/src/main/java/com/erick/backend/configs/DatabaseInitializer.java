package com.erick.backend.configs;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) {
        String sql =
            "INSERT INTO t_role (id, role_name) SELECT '2950b982-3f2a-46c0-8694-796ab4988b4b', 'ROLE_USER' " +
            "WHERE NOT EXISTS (SELECT 1 FROM t_role WHERE id = '2950b982-3f2a-46c0-8694-796ab4988b4b')";
        jdbcTemplate.update(sql);
    }
}
