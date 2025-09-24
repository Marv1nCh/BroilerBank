package com.nemo.broilerbackend.readmodel.purchaseView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class PurchaseViewService {

    private final PurchaseViewRepository purchaseViewRepository;

    @Autowired
    public  PurchaseViewService(PurchaseViewRepository purchaseViewRepository) {
        this.purchaseViewRepository = purchaseViewRepository;
    }

    public List<PurchaseView> findAll() {
        return purchaseViewRepository.findAll();
    }

    public Optional<PurchaseView> findById(UUID id) {return purchaseViewRepository.findById(id);}
}
