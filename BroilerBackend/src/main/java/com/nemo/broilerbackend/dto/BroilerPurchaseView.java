package com.nemo.broilerbackend.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "broiler_purchase_by_date")
@Immutable
public class BroilerPurchaseView {
    @Id
    private Long id;
    private String first_name;
    private String name;
    private Date date;
    private Integer broiler;
    private Integer fries;
    private Integer coleslaw;
    private boolean paid;
    private BigDecimal total_cost;
    private BigDecimal due_cost;
}
