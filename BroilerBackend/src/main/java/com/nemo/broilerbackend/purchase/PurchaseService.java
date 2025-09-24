package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.PurchasedProducts.PurchasedProducts;
import com.nemo.broilerbackend.PurchasedProducts.PurchasedProductsRepository;
import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class PurchaseService {

    private final PurchaseRepository purchaseRepository;
    private final UserRepository userRepository;
    private final PurchasedProductsRepository purchasedProductsRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, UserRepository userRepository, PurchasedProductsRepository purchasedProductsRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.purchasedProductsRepository = purchasedProductsRepository;
    }

    public Optional<UUID> addNewPurchase(PurchaseDTO purchaseDTO) {
        System.out.println(purchaseDTO.getPrice());
        Optional<User> user = userRepository.findByGivenNameAndSurname(purchaseDTO.getGivenName(), purchaseDTO.getSurname());

        return user.map(userOptional -> {
            Purchase purchase = Purchase.builder()
                    .userId(user.get().getId())
                    .date(purchaseDTO.getDate())
                    .paid(purchaseDTO.isPaid())
                    .build();

            Purchase savedPurchase = purchaseRepository.save(purchase);

            purchaseDTO.getProducts().forEach(productString -> {
                PurchasedProducts purchasedProducts = new PurchasedProducts(savedPurchase.getId(), productString);
                purchasedProductsRepository.save(purchasedProducts);
            });
            return savedPurchase.getId();
        });
    }
}
