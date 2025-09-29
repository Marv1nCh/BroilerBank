package com.nemo.broilerbackend.readmodel.productsPricesView;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.Getter;
import org.hibernate.annotations.Immutable;

import java.time.Instant;
import java.util.UUID;

@Getter
@Table(name = "product_price_view")
@Immutable
@Entity
@IdClass(ProductPriceViewCompositeKey.class)
public class ProductPriceView {
    @Id
    private UUID id;
    private String type;
    @Id
    private Instant startDate;
    private double price;
}
