package com.erick.backend.domains.entities;

import jakarta.persistence.*;
import java.sql.Blob;
import java.util.UUID;
import lombok.*;

@Table(name = "t_image")
@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;
    private String type;

    @Lob
    private Blob profileImage;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
