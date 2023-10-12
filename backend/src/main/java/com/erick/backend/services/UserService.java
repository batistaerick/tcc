package com.erick.backend.services;

import com.erick.backend.converters.UserConverter;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.Role;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.RoleName;
import com.erick.backend.exceptions.EmailNotFoundException;
import com.erick.backend.repositories.UserRepository;
import com.erick.backend.utils.CredentialsChecker;
import com.erick.backend.utils.UserSession;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository repository;
    private final UserConverter converter;
    private final PasswordEncoder encoder;
    private final RoleService roleService;

    public UserDto save(User user) {
        CredentialsChecker.isValidPassword(user.getPassword());
        user.setPassword(encoder.encode(user.getPassword()));
        Role role = roleService.findByRoleName(RoleName.ROLE_USER);
        user.setRoles(Collections.singleton(role));
        return converter.entityToDto(repository.save(user));
    }

    public User findByEmail(String email) {
        return repository
            .findByEmail(email)
            .orElseThrow(EmailNotFoundException::new);
    }

    public UserDto findByAuthenticatedEmail() {
        UserDto userDto = repository
            .findByEmail(UserSession.getAuthenticatedEmail())
            .map(converter::entityToDto)
            .orElseThrow(EmailNotFoundException::new);
        userDto.setPassword(null);

        return userDto;
    }

    public void update(User updatedUser) {
        User existingUser = repository
            .findByEmail(UserSession.getAuthenticatedEmail())
            .orElseThrow(EmailNotFoundException::new);

        if (updatedUser.getName() != null) {
            existingUser.setName(updatedUser.getName());
        }
        if (updatedUser.getPassword() != null) {
            CredentialsChecker.isValidPassword(updatedUser.getPassword());
            existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
        }
        if (updatedUser.getProfileImage() != null) {
            existingUser.setProfileImage(updatedUser.getProfileImage());
        }
        repository.save(updatedUser);
    }
}
