package com.erick.backend.controllers;

import com.erick.backend.converters.UserConverter;
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
    private final UserConverter converter;

    @PostMapping
    public ResponseEntity<UserDto> save(@RequestBody UserDto dto) {
        UserDto userDto = service.save(dto);
        URI uri = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(userDto.getId())
            .toUri();
        return ResponseEntity.created(uri).body(userDto);
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<Void> update(@RequestBody UserDto dto) {
        service.update(dto);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/current-user")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDto> findByAuthenticated() {
        UserDto userDto = service.findByAuthenticatedEmail();
        return ResponseEntity.ok(userDto);
    }
}
