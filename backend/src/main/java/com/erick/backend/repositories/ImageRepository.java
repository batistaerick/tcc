package com.erick.backend.repositories;

import com.erick.backend.domains.entities.Image;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, UUID> {
    Optional<Image> findByUserEmail(String userEmail);
}
