package com.nemo.broilerbackend.readmodel.purchaseView;

import com.nemo.broilerbackend.dto.BroilerPurchaseView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PurchaseViewService {

    private final PurchaseViewRepository purchaseViewRepository;

    @Autowired
    public  PurchaseViewService(PurchaseViewRepository purchaseViewRepository) {
        this.purchaseViewRepository = purchaseViewRepository;
    }

    public List<BroilerPurchaseView> findAll() {
        return purchaseViewRepository.findAll();
    }
}
