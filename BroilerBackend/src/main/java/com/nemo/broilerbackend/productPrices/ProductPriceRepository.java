package com.nemo.broilerbackend.productPrices;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, UUID> {
    List<ProductPrice> findByProductId(UUID productId);

    void deleteByProductIdAndPrice(UUID productId, double price);
}
