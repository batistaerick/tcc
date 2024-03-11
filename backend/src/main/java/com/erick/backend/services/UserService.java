package com.erick.backend.services;

import com.erick.backend.converters.UserConverter;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.Role;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.I18nCode;
import com.erick.backend.enums.RoleName;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.UserRepository;
import com.erick.backend.utils.CredentialsChecker;
import com.erick.backend.utils.UserSession;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service class for managing user-related operations.
 * This includes finding, saving, and updating user information.
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserConverter converter;
    private final PasswordEncoder encoder;
    private final RoleService roleService;

    /**
     * Finds a user by their email address.
     *
     * @param email The email address of the user to find.
     * @return The found User entity.
     * @throws GlobalException if the user is not found, with an HttpStatus of NOT_FOUND.
     */
    public User findByEmail(String email) {
        return repository
            .findByEmail(email)
            .orElseThrow(() ->
                new GlobalException(
                    HttpStatus.NOT_FOUND,
                    I18nCode.EMAIL_NOT_FOUND,
                    "User email not found {}",
                    email
                )
            );
    }

    /**
     * Saves a new user to the repository. Validates the uniqueness of the email and the password criteria before saving.
     *
     * @param dto The UserDto object containing user information to be saved.
     * @return The saved UserDto.
     * @throws GlobalException if the email is already registered or the password does not meet the criteria,
     *                         with an HttpStatus of CONFLICT or UNAUTHORIZED respectively.
     */
    public UserDto save(UserDto dto) {
        boolean emailIsPresent = repository
            .findByEmail(dto.getEmail())
            .isPresent();
        if (emailIsPresent) {
            throw new GlobalException(
                HttpStatus.CONFLICT,
                I18nCode.EXISTING_EMAIL,
                "The email you provided is already registered. Please use a different email address."
            );
        }
        CredentialsChecker.isValidPassword(dto.getPassword());
        User user = converter.dtoToEntity(dto);
        user.setPassword(encoder.encode(dto.getPassword()));
        Role role = roleService.findByRoleName(RoleName.USER);
        user.setRoles(Collections.singleton(role));
        return converter.entityToDto(repository.save(user));
    }

    /**
     * Finds a user DTO by the email of the currently authenticated user.
     *
     * @return The UserDto of the authenticated user.
     */
    public UserDto findByAuthenticatedEmail() {
        String email = UserSession.getAuthenticatedEmail();
        UserDto userDto = converter.entityToDto(findByEmail(email));
        userDto.setPassword(null);
        return userDto;
    }

    /**
     * Updates the existing user details based on the provided UserDto.
     * Updates the name and password if they are not null and not blank.
     *
     * @param updatedUser The UserDto containing the updated user information.
     */
    public void update(UserDto updatedUser) {
        User existingUser = findByEmail(UserSession.getAuthenticatedEmail());
        if (updatedUser.getName() != null && !updatedUser.getName().isBlank()) {
            existingUser.setName(updatedUser.getName());
        }
        if (
            updatedUser.getPassword() != null &&
            !updatedUser.getPassword().isBlank()
        ) {
            CredentialsChecker.isValidPassword(updatedUser.getPassword());
            existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
        }
        repository.save(existingUser);
    }
}
