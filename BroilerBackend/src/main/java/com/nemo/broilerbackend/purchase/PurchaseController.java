package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.readmodel.purchaseView.BroilerPurchaseView;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/purchases")
public class PurchaseController {

    private final PurchaseService purchaseService;
    private final UserService userService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService, UserService userService) {
        this.purchaseService = purchaseService;
        this.userService = userService;
    }

    @GetMapping
    public List<PurchaseDTO> getAllPurchases() {
        return purchaseService.getAllPurchases().stream().map(purchase -> {
            Optional<User> user = userService.getUserById(purchase.getUserId());

            return user.map(value -> new PurchaseDTO(purchase, value)).orElse(null);
        }).toList();
    }

    @PostMapping
    public Optional<BroilerPurchaseView> createPurchase(@RequestBody BroilerPurchaseView broilerPurchaseView) {
        return purchaseService.addNewPurchase(broilerPurchaseView);
    }
}
