package com.erick.backend.controllers;

import com.erick.backend.services.ImageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static org.springframework.http.ResponseEntity.noContent;
import static org.springframework.http.ResponseEntity.ok;

/**
 * REST controller for managing profile images.
 * This controller handles HTTP requests related to image operations such as updating and retrieving user profile images.
 */
@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService service;

    /**
     * Updates the profile image of the currently authenticated user.
     *
     * @param file The MultipartFile containing the new profile image.
     * @return A ResponseEntity with HTTP status NO_CONTENT.
     */
    @PostMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> updateProfileImage(
        @Valid @RequestBody MultipartFile file
    ) {
        service.updateProfileImage(file);
        return noContent().build();
    }

    /**
     * Retrieves the profile image of the currently authenticated user.
     *
     * @return A ResponseEntity containing the user's profile image as a byte array.
     */
    @GetMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<byte[]> getProfileImage() {
        byte[] image = service.findByUserEmail();
        return ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }
}
