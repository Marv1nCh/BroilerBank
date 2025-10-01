package com.nemo.broilerbackend.productPrices;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;
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
    @JsonFormat(pattern = "EEE MMM dd yyyy", locale = "en")
    private LocalDate startDate;
    private double price;
}
