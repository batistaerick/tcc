package com.erick.backend.controllers;

import static org.springframework.http.ResponseEntity.ok;

import com.erick.backend.domains.dtos.GoalDto;
import com.erick.backend.services.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService service;

    @PostMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<GoalDto> save(@RequestBody GoalDto goal) {
        GoalDto goalDto = service.save(goal);
        return ok(goalDto);
    }
}
