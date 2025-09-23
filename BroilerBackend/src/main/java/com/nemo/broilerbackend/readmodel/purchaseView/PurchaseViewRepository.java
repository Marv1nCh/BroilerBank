package com.nemo.broilerbackend.readmodel.purchaseView;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PurchaseViewRepository extends JpaRepository<BroilerPurchaseView, Long> {

    List<BroilerPurchaseView> findAll();


}
