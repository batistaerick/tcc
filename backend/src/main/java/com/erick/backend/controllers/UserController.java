package com.erick.backend.controllers;

import static org.springframework.http.ResponseEntity.*;

import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.services.UserService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 * REST controller for managing users.
 * This controller handles HTTP requests related to user operations such as creating, updating, and retrieving user details.
 */
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    /**
     * Creates a new user.
     *
     * @param dto The UserDto containing the information for the new user.
     * @return A ResponseEntity with the created UserDto and the URI of the newly created user.
     */
    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody UserDto dto) {
        UserDto userDto = service.save(dto);
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(userDto.getId())
            .toUri();
        return created(uri).body(userDto);
    }

    /**
     * Updates an existing user's information.
     * The user is identified by the currently authenticated user's credentials.
     *
     * @param dto The UserDto containing the updated information for the user.
     * @return A ResponseEntity with HTTP status NO_CONTENT.
     */
    @PutMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Void> update(@RequestBody UserDto dto) {
        service.update(dto);
        return noContent().build();
    }

    /**
     * Retrieves the currently authenticated user's details.
     *
     * @return A ResponseEntity containing the UserDto of the authenticated user.
     */
    @GetMapping("/current-user")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<UserDto> findByAuthenticated() {
        UserDto userDto = service.findByAuthenticatedEmail();
        return ok(userDto);
    }
}
