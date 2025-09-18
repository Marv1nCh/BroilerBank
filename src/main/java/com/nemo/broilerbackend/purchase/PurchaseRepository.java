package com.nemo.broilerbackend.purchase;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PurchaseRepository extends JpaRepository<Purchase,Integer> {

    Optional<Purchase> getById(Long id);
}
