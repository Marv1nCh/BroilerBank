package com.nemo.broilerbackend.PurchasedProducts;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Entity
@Builder
@Table(name="purchased_product")
@NoArgsConstructor
@AllArgsConstructor
@IdClass(PurchasedProductCompositeKey.class)
public class PurchasedProduct {
    @Id
    private UUID purchaseId;
    @Id
    private UUID productId;
}
