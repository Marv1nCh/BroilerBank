package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.readmodel.purchaseView.BroilerPurchaseView;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final PurchaseViewService  purchaseViewService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService, PurchaseViewService purchaseViewService) {
        this.purchaseService = purchaseService;
        this.purchaseViewService = purchaseViewService;
    }

    @GetMapping
    public List<BroilerPurchaseView> getAllPurchases() {
        return purchaseViewService.findAll();
    }

    @PostMapping
    public Optional<BroilerPurchaseView> createPurchase(@RequestBody BroilerPurchaseView broilerPurchaseView) {
        return purchaseService.addNewPurchase(broilerPurchaseView);
    }
}
