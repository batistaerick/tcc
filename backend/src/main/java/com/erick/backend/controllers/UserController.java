package com.erick.backend.controllers;

import com.erick.backend.converters.UserConverter;
import com.erick.backend.domains.dtos.UserDto;
import com.erick.backend.domains.entities.User;
import com.erick.backend.services.UserService;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;
    private final UserConverter converter;

    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody User user) {
        UserDto userDto = service.save(user);
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(user.getId())
            .toUri();
        return ResponseEntity.created(uri).body(userDto);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> update(@RequestBody User user) {
        service.update(user);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{email}/find-by-email")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> findByEmail(@PathVariable String email) {
        UserDto userDto = converter.entityToDto(service.findByEmail(email));
        return ResponseEntity.ok(userDto);
    }

    @GetMapping("/current-user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> findByAuthenticated() {
        UserDto userDto = service.findByAuthenticatedEmail();
        return ResponseEntity.ok(userDto);
    }
}
