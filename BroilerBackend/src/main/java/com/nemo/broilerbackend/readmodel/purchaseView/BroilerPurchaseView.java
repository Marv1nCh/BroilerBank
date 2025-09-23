package com.nemo.broilerbackend.readmodel.purchaseView;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Entity
@Table(name = "broiler_purchase_by_date")
@Immutable
public class BroilerPurchaseView {
    @Id
    private Long id;
    private String firstName;
    private String name;
    private Instant date;
    private Integer broiler;
    private Integer fries;
    private Integer coleslaw;
    private boolean paid;
    private BigDecimal totalCost;
    private BigDecimal dueCost;
}
