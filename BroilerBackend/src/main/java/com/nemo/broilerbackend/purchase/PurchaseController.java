package com.nemo.broilerbackend.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping
    public List<Purchase> getAllPurchases() {
        return purchaseService.getAllPurchases();
    }

    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        System.out.println(purchase.getBroiler());
        return purchaseService.addNewPurchase(purchase);
    }
}
