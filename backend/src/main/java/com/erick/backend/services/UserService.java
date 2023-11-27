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

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserConverter converter;
    private final PasswordEncoder encoder;
    private final RoleService roleService;

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
        Role role = roleService.findByRoleName(RoleName.ROLE_USER);
        user.setRoles(Collections.singleton(role));
        return converter.entityToDto(repository.save(user));
    }

    public UserDto findByAuthenticatedEmail() {
        String email = UserSession.getAuthenticatedEmail();
        UserDto userDto = converter.entityToDto(findByEmail(email));
        userDto.setPassword(null);
        return userDto;
    }

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
