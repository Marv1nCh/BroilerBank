package com.nemo.broilerbackend.readmodel.productsPricesView;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ProductPriceViewRepository extends JpaRepository<ProductPriceView, UUID> {
}
