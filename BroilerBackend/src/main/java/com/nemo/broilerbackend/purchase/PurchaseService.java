package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.PurchasedProducts.PurchasedProduct;
import com.nemo.broilerbackend.PurchasedProducts.PurchasedProductsRepository;
import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.product.Product;
import com.nemo.broilerbackend.product.ProductRepository;
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
    private final ProductRepository productRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository, UserRepository userRepository,
                           PurchasedProductsRepository purchasedProductsRepository, ProductRepository productRepository) {
        this.purchaseRepository = purchaseRepository;
        this.userRepository = userRepository;
        this.purchasedProductsRepository = purchasedProductsRepository;
        this.productRepository = productRepository;
    }

    public Optional<UUID> addNewPurchase(PurchaseDTO purchaseDTO) {
        Optional<User> user = userRepository.findByGivenNameAndSurname(purchaseDTO.getGivenName(), purchaseDTO.getSurname());

        return user.map(userOptional -> {
            Purchase purchase = Purchase.builder()
                    .userId(user.get().getId())
                    .date(purchaseDTO.getDate())
                    .paid(purchaseDTO.isPaid())
                    .build();

            Purchase savedPurchase = purchaseRepository.save(purchase);

            purchaseDTO.getProducts().forEach(productString -> {
                Product product = productRepository.findByType(productString);
                PurchasedProduct purchasedProduct = new PurchasedProduct(savedPurchase.getId(), product.getId());
                purchasedProductsRepository.save(purchasedProduct);
            });
            return savedPurchase.getId();
        });
    }
}
