package com.erick.backend.controllers;

import com.erick.backend.domains.entities.Role;
import com.erick.backend.services.RoleService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService service;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Role> save(@RequestBody Role role) {
        Role roles = service.save(role);
        return ResponseEntity.ok(roles);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Role>> findAll() {
        List<Role> roles = service.findAll();
        return ResponseEntity.ok(roles);
    }
}
