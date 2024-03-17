package com.erick.backend.converters;

import com.erick.backend.domains.dtos.GoalDto;
import com.erick.backend.domains.entities.Goal;
import org.springframework.stereotype.Component;

@Component
public class GoalConverter {

    public GoalDto entityToDto(Goal entity) {
        GoalDto dto = GoalDto
            .builder()
            .id(entity.getId())
            .title(entity.getTitle())
            .description(entity.getDescription())
            .startDate(entity.getStartDate())
            .endDate(entity.getEndDate())
            .build();
        if (entity.getUser() != null) {
            dto.setUser(DefaultConverters.userEntityToDto(entity.getUser()));
        }
        return dto;
    }

    public Goal dtoToEntity(GoalDto dto) {
        Goal entity = Goal
            .builder()
            .id(dto.getId())
            .title(dto.getTitle())
            .description(dto.getDescription())
            .startDate(dto.getStartDate())
            .endDate(dto.getEndDate())
            .build();
        if (dto.getUser() != null) {
            entity.setUser(DefaultConverters.userDtoToEntity(dto.getUser()));
        }
        return entity;
    }
}
