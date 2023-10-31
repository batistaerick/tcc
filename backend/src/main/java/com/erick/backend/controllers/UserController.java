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

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

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

    @PutMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> update(@RequestBody UserDto dto) {
        service.update(dto);
        return noContent().build();
    }

    @GetMapping("/current-user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> findByAuthenticated() {
        UserDto userDto = service.findByAuthenticatedEmail();
        return ok(userDto);
    }
}
