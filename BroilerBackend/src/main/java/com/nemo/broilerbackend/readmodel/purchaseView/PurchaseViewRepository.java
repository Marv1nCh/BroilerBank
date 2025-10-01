package com.nemo.broilerbackend.readmodel.purchaseView;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.UUID;

public interface PurchaseViewRepository extends JpaRepository<PurchaseView, UUID> {

    boolean existsByGivenNameAndDate(String givenName, Instant date);
}
