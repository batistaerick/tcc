package com.erick.backend.services;

import com.erick.backend.domains.entities.Image;
import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.ImageRepository;
import com.erick.backend.utils.UserSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;


/**
 * Service class for managing image-related operations.
 * This service handles the storage and retrieval of user profile images.
 */
@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository repository;
    private final UserService userService;

    /**
     * Updates the profile image of the currently authenticated user.
     *
     * @param file The MultipartFile containing the image to be updated.
     * @throws GlobalException If there's an IOException or SQLException during the image processing,
     *                         or if the image is invalid, with an HttpStatus of INTERNAL_SERVER_ERROR.
     */
    public void updateProfileImage(MultipartFile file) {
        Image image = repository
            .findByUserEmail(UserSession.getAuthenticatedEmail())
            .orElse(new Image());
        try {
            Blob blob = new SerialBlob(file.getBytes());
            image.setProfileImage(blob);
        } catch (IOException | SQLException exception) {
            throw new GlobalException(
                exception,
                HttpStatus.INTERNAL_SERVER_ERROR,
                I18nCode.INVALID_IMAGE,
                "Invalid image {}",
                exception.getMessage()
            );
        }
        image.setName(file.getName());
        image.setType(file.getContentType());
        image.setUser(
            userService.findByEmail(UserSession.getAuthenticatedEmail())
        );
        repository.save(image);
    }

    /**
     * Retrieves the profile image of the currently authenticated user as a byte array.
     *
     * @return A byte array representing the user's profile image.
     * @throws GlobalException If the image is not found, with an HttpStatus of NOT_FOUND,
     *                         or if there's an error in retrieving the image, with an HttpStatus of INTERNAL_SERVER_ERROR.
     */
    @Transactional
    public byte[] findByUserEmail() {
        Image image = repository
            .findByUserEmail(UserSession.getAuthenticatedEmail())
            .orElseThrow(() ->
                new GlobalException(
                    HttpStatus.NOT_FOUND,
                    I18nCode.IMAGE_NOT_FOUND,
                    "Not found."
                )
            );
        try {
            return image
                .getProfileImage()
                .getBytes(1, (int) image.getProfileImage().length());
        } catch (Exception exception) {
            throw new GlobalException(
                exception,
                HttpStatus.INTERNAL_SERVER_ERROR,
                I18nCode.ERROR_GETTING_IMAGE,
                "Error getting profile image {}",
                exception
            );
        }
    }
}
