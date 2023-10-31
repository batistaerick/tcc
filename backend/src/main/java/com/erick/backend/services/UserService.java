package com.erick.backend.services;

import com.erick.backend.converters.UserConverter;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.Role;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.RoleName;
import com.erick.backend.exceptions.EmailNotFoundException;
import com.erick.backend.exceptions.ExistingEmailException;
import com.erick.backend.repositories.UserRepository;
import com.erick.backend.utils.CredentialsChecker;
import com.erick.backend.utils.UserSession;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserService {

    private final UserRepository repository;
    private final UserConverter converter;
    private final PasswordEncoder encoder;
    private final RoleService roleService;

    public UserDto save(UserDto dto) {
        if (repository.findByEmail(dto.getEmail()).isPresent()) {
            throw new ExistingEmailException();
        }
        CredentialsChecker.isValidPassword(dto.getPassword());
        User user = converter.dtoToEntity(dto);
        user.setPassword(encoder.encode(dto.getPassword()));
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

    public void update(UserDto updatedUser) {
        User existingUser = repository
            .findByEmail(UserSession.getAuthenticatedEmail())
            .orElseThrow(EmailNotFoundException::new);
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
