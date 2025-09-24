package com.nemo.broilerbackend.PurchasedProducts;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@Entity
@Builder
@Table(name="purchased_products")
@NoArgsConstructor
@AllArgsConstructor
@IdClass(PPCompositeKey.class)
public class PurchasedProducts {
    @Id
    private UUID purchaseId;
    @Id
    private String product;
}
