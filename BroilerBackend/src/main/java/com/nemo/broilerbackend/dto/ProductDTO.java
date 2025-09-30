package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.readmodel.productsPricesView.ProductPriceView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private LocalDate startDate;
    private String type;
    private double price;

    public ProductDTO(ProductPriceView productPriceView) {
        this.startDate = productPriceView.getStartDate();
        this.type = productPriceView.getType();
        this.price = productPriceView.getPrice();
    }
}
