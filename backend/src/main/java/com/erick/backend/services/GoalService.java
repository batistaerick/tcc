package com.erick.backend.services;

import com.erick.backend.converters.GoalConverter;
import com.erick.backend.domains.dtos.GoalDto;
import com.erick.backend.domains.entities.Goal;
import com.erick.backend.domains.entities.User;
import com.erick.backend.enums.I18nCode;
import com.erick.backend.exceptions.GlobalException;
import com.erick.backend.repositories.GoalRepository;
import com.erick.backend.utils.UserSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository repository;
    private final GoalConverter converter;
    private final UserService userService;

    public GoalDto findDtoById(UUID id) {
        return repository
            .findById(id)
            .map(converter::entityToDto)
            .orElseThrow(() ->
                new GlobalException(
                    HttpStatus.NOT_FOUND,
                    I18nCode.TRANSACTION_NOT_FOUND,
                    "Goal not found for id {}",
                    id
                )
            );
    }

    public GoalDto save(GoalDto dto) {
        UUID id = userService
            .findByEmail(UserSession.getAuthenticatedEmail())
            .getId();
        Goal goal = converter.dtoToEntity(dto);
        goal.setUser(User.builder().id(id).build());
        return converter.entityToDto(repository.save(goal));
    }
}
