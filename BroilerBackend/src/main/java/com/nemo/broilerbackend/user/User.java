package com.nemo.broilerbackend.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
    private String userType;
    private List<String> roles;
    @CreatedDate
    private LocalDate createdAt;
    @JsonFormat(pattern = "EEE MMM dd yyyy", locale = "en")
    private LocalDate updatedAt;

}
