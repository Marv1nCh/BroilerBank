package com.nemo.broilerbackend.importDB.transformers;

import com.nemo.broilerbackend.product.Product;
import com.nemo.broilerbackend.productPrices.ProductPrice;

import java.time.LocalDate;
import java.util.UUID;

public class ProductAndPriceTransformer {

    public static Product parseToProduct(String line) {
        String[] file = line.split(",");

        String type = file[2];

        return Product.builder()
                .type(type)
                .build();

    }

    public static ProductPrice parseToProductPrice(String line, UUID productId) {
        String[] file = line.split(",");

        LocalDate createdAt = LocalDate.parse(file[1]);
        double price = Double.parseDouble(file[3]);

        return ProductPrice.builder()
                .productId(productId)
                .price(price)
                .startDate(createdAt)
                .build();
    }
}
