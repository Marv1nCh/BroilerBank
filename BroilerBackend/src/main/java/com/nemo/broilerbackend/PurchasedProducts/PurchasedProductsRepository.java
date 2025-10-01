package com.nemo.broilerbackend.PurchasedProducts;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PurchasedProductsRepository extends JpaRepository<PurchasedProduct, UUID> {

    List<PurchasedProduct> findByPurchaseId(UUID purchaseId);
}
