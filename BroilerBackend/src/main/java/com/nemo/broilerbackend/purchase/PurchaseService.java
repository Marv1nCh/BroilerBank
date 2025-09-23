package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.readmodel.purchaseView.BroilerPurchaseView;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseViewRepository;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;

    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }

    public Optional<BroilerPurchaseView> addNewPurchase(BroilerPurchaseView broilerPurchaseView) {
        return Optional.empty();
    }
}
