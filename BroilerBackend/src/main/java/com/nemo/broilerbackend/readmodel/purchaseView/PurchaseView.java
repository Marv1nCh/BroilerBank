package com.nemo.broilerbackend.readmodel.purchaseView;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.Immutable;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Table(name = "complete_purchase_view")
@Immutable
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PurchaseView {
    @Id
    private UUID purchaseId;
    private String givenName;
    private String surname;
    private LocalDate date;
    private List<String> products;
    private boolean paid;
    private double price;
}
