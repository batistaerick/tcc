package com.erick.backend.domains.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.UUID;
import lombok.*;

@Table(name = "t_goal")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Goal {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private User user;

    private String title;
    private String description;
    private Double currentlyAmount;
    private Double targetAmount;
    private LocalDate startDate;
    private LocalDate endDate;
}
