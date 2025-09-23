package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.product.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ProductDTO {
    private Instant startDate;
    private String type;
    private double price;

    public ProductDTO(Product product) {
        this.type = product.getType();
        this.price = product.getPrice();
        this.startDate = product.getStartDate();
    }
}
