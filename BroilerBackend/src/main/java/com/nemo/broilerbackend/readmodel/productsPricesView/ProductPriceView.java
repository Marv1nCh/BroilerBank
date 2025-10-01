package com.nemo.broilerbackend.readmodel.productsPricesView;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Immutable;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Table(name = "product_price_view")
@Immutable
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@IdClass(ProductPriceViewCompositeKey.class)
public class ProductPriceView {
    @Id
    private UUID id;
    private String type;
    @Id
    private LocalDate startDate;
    private double price;
}
