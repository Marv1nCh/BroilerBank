package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final PurchaseViewService purchaseViewService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService, PurchaseViewService purchaseViewService) {
        this.purchaseService = purchaseService;
        this.purchaseViewService = purchaseViewService;
    }

    @GetMapping
    public List<PurchaseDTO> getAllPurchases() {
        return purchaseViewService.findAll().stream().map(PurchaseDTO::new).toList();
    }

    @PostMapping
    public ResponseEntity<Optional<PurchaseDTO>> createPurchase(@RequestBody PurchaseDTO purchaseDTO) {
        Optional<PurchaseDTO> savedPurchaseDto = purchaseService.addNewPurchase(purchaseDTO)
                .flatMap(purchaseViewService::findById)
                .map(PurchaseDTO::new);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPurchaseDto);
    }

    @PutMapping
    public Optional<PurchaseDTO> updatePurchase(@RequestBody PurchaseDTO purchaseDTO) {
        return purchaseService.updatePurchase(purchaseDTO)
                .flatMap(purchaseViewService::findById)
                .map(PurchaseDTO::new);
    }
}
