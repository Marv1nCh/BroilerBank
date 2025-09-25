package com.nemo.broilerbackend.productPrices;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Getter
@Entity
@Table(name = "product_price")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(ProductPriceCompositeKey.class)
public class ProductPrice {
    @Id
    private UUID productId;
    @Id
    private Instant startDate;
    private double price;
}
