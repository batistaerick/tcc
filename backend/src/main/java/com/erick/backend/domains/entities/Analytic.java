package com.erick.backend.domains.entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.*;

@Table(name = "t_analytic")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Analytic {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(unique = true, nullable = false)
    private String path;

    @ElementCollection
    @CollectionTable(
        name = "t_analytic_country",
        joinColumns = {
            @JoinColumn(name = "analytic_id", referencedColumnName = "id"),
        }
    )
    @MapKeyColumn(name = "date")
    @Column(name = "countries")
    private Map<LocalDate, List<String>> countries;

    @ElementCollection
    @CollectionTable(
        name = "t_analytic_access",
        joinColumns = {
            @JoinColumn(name = "analytic_id", referencedColumnName = "id"),
        }
    )
    @MapKeyColumn(name = "date")
    @Column(name = "accesses")
    private Map<LocalDate, Long> accesses;

    public void increaseValues(String country) {
        if (accesses != null) {
            accesses.merge(LocalDate.now(), 1L, Long::sum);
        } else {
            accesses = Map.of(LocalDate.now(), 1L);
        }
        if (country != null) {
            if (countries != null) {
                countries.merge(
                    LocalDate.now(),
                    List.of(country),
                    (oldList, newList) -> {
                        oldList.addAll(newList);
                        return oldList;
                    }
                );
            } else {
                countries = Map.of(LocalDate.now(), List.of(country));
            }
        }
    }
}
