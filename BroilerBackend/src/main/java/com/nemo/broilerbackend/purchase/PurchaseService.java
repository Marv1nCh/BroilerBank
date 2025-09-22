package com.nemo.broilerbackend.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;

    }

    public Purchase addNewPurchase(Purchase purchase) {
        purchase.setId(null);
        return purchaseRepository.save(purchase);
    }
}
