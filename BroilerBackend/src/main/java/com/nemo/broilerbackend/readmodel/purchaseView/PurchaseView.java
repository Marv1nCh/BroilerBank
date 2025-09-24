package com.nemo.broilerbackend.readmodel.purchaseView;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.Immutable;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Getter
@Table(name = "complete_purchase_view")
@Immutable
@Entity
public class PurchaseView {
    @Id
    private UUID id;
    private String givenName;
    private String surname;
    private Instant date;
    private List<String> products;
    private boolean paid;
    private double price;
}
