package com.nemo.broilerbackend.productPrices;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductPriceRepository extends JpaRepository<ProductPrice, UUID> {
}
