package com.erick.backend.services;

import com.erick.backend.domains.entities.Image;
import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.ImageRepository;
import com.erick.backend.utils.UserSession;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import javax.sql.rowset.serial.SerialBlob;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Log4j2
@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository repository;
    private final UserService userService;

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
