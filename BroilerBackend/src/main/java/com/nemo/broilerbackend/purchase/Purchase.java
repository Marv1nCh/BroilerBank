package com.nemo.broilerbackend.purchase;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Entity
@Builder
@Table(name="purchase")
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private UUID userId;
    @JsonFormat(pattern = "EEE MMM dd yyyy", locale = "en")
    private LocalDate date;
    private boolean paid;
}
