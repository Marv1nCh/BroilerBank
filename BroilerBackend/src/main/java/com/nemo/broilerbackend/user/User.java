package com.nemo.broilerbackend.user;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
@EntityListeners(org.springframework.data.jpa.domain.support.AuditingEntityListener.class)
@Table(name="users")
public class User {

    @Id
    @Setter
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String userPrincipleName;
    private String displayName;
    private String email;
    private String givenName;
    private String surname;
    private boolean accountEnabled;
    private List<String> roles;
    @CreatedDate
    private Instant createdAt;
    private Instant updatedAt;

}
