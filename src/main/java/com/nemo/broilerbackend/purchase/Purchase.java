package com.nemo.broilerbackend.purchase;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@Entity
@Builder
@Table(name="broiler_purchase")
@AllArgsConstructor
@NoArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long user_id;

    private Date date;

    private int broiler;

    private int fries;

    private int coleslaw;

    private boolean paid;
}
