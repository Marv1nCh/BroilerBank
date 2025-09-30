package com.nemo.broilerbackend.PurchasedProducts;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PurchasedProductsRepository extends JpaRepository<PurchasedProduct, UUID> {

    Optional<PurchasedProduct> findByPurchaseIdAndProductId(UUID purchaseId, UUID productId);

}
