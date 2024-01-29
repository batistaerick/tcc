package com.erick.backend.services;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.erick.backend.domains.entities.Image;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.ImageRepository;
import com.erick.backend.utils.UserSession;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Optional;
import javax.sql.rowset.serial.SerialBlob;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
class ImageServiceTest {

    @Mock
    private ImageRepository repository;

    @Mock
    private UserService userService;

    @InjectMocks
    private ImageService imageService;

    @Test
    void updateProfileImage_ValidFile_SaveImage() throws IOException {
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            MultipartFile file = createMockMultipartFile();
            Image existingImage = new Image();

            when(repository.findByUserEmail(authenticatedEmail))
                .thenReturn(Optional.of(existingImage));
            when(userService.findByEmail(authenticatedEmail))
                .thenReturn(User.builder().build());
            imageService.updateProfileImage(file);

            verify(repository, times(1)).save(any(Image.class));
        }
    }

    @Test
    void updateProfileImage_InvalidUser_ThrowsGlobalException()
        throws IOException {
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            MultipartFile invalidFile = createInvalidMockMultipartFile();

            doThrow(
                new GlobalException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    I18nCode.ERROR_GETTING_IMAGE,
                    "Error"
                )
            )
                .when(userService)
                .findByEmail(authenticatedEmail);

            assertThrows(
                GlobalException.class,
                () -> imageService.updateProfileImage(invalidFile)
            );
            verify(repository, never()).save(any(Image.class));
        }
    }

    @Test
    void findByUserEmail_ImageFound_ReturnsImageBytes() throws SQLException {
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            Image existingImage = new Image();
            existingImage.setProfileImage(createMockBlob());

            when(repository.findByUserEmail(authenticatedEmail))
                .thenReturn(Optional.of(existingImage));
            byte[] result = imageService.findByUserEmail();

            assertNotNull(result);
            assertTrue(result.length > 0);
        }
    }

    @Test
    void findByUserEmail_ImageNotFound_ThrowsGlobalException() {
        String authenticatedEmail = "test@test.com";
        try (
            MockedStatic<UserSession> staticUserSessionMock =
                Mockito.mockStatic(UserSession.class)
        ) {
            staticUserSessionMock
                .when(UserSession::getAuthenticatedEmail)
                .thenReturn(authenticatedEmail);
            when(repository.findByUserEmail(authenticatedEmail))
                .thenReturn(Optional.empty());

            assertThrows(
                GlobalException.class,
                () -> imageService.findByUserEmail()
            );
        }
    }

    private MultipartFile createMockMultipartFile() throws IOException {
        byte[] content = "test data".getBytes();
        return new MockMultipartFile(
            "testFile",
            "testFile.txt",
            "text/plain",
            content
        );
    }

    private MultipartFile createInvalidMockMultipartFile() throws IOException {
        byte[] content = new byte[0];
        return new MockMultipartFile(
            "emptyFile",
            "emptyFile.txt",
            "text/plain",
            content
        );
    }

    private Blob createMockBlob() throws SQLException {
        return new SerialBlob("test data".getBytes());
    }
}
