package com.erick.backend.services;

import com.erick.backend.domains.entities.Image;
import com.erick.backend.domains.entities.User;
import com.erick.backend.exceptions.ImageException;
import com.erick.backend.repositories.ImageRepository;
import com.erick.backend.utils.UserSession;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import javax.sql.rowset.serial.SerialBlob;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository repository;
    private final UserService userService;

    public void updateProfileImage(MultipartFile file) {
        User existingUser = userService.findByEmail(
            UserSession.getAuthenticatedEmail()
        );
        if (file == null || file.isEmpty()) {
            throw new ImageException("Empty image.");
        }
        try {
            Blob blob = new SerialBlob(file.getBytes());
            Image image = Image
                .builder()
                .name(file.getName())
                .type(file.getContentType())
                .profileImage(blob)
                .user(existingUser)
                .build();
            repository.save(image);
        } catch (IOException | SQLException exception) {
            throw new ImageException("Invalid image: {}", exception);
        }
    }

    @Transactional
    public byte[] findByUserEmail() {
        try {
            Image image = repository
                .findByUserEmail(UserSession.getAuthenticatedEmail())
                .orElseThrow(() -> new ImageException("Not found."));
            return image
                .getProfileImage()
                .getBytes(1, (int) image.getProfileImage().length());
        } catch (Exception exception) {
            throw new ImageException(
                "Error getting profile image: {}",
                exception
            );
        }
    }
}
