package com.nemo.broilerbackend.purchase;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter
@Entity
@Builder
@Table(name="broiler_purchase")
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Instant date;

    private int broiler;

    private int fries;

    private int coleslaw;

    private boolean paid;
}
