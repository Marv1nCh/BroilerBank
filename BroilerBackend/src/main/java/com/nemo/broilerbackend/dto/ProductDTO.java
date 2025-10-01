package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.readmodel.productsPricesView.ProductPriceView;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private UUID productId;
    private LocalDate startDate;
    private String type;
    private double price;

    public ProductDTO(ProductPriceView productPriceView) {
        this.productId = productPriceView.getId();
        this.startDate = productPriceView.getStartDate();
        this.type = productPriceView.getType();
        this.price = productPriceView.getPrice();
    }
}
