package com.nemo.broilerbackend.purchase;

import com.nemo.broilerbackend.PurchasedProducts.PurchasedProduct;
import com.nemo.broilerbackend.PurchasedProducts.PurchasedProductsRepository;
import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.product.Product;
import com.nemo.broilerbackend.product.ProductRepository;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseViewRepository;
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
                           PurchasedProductsRepository purchasedProductsRepository, ProductRepository productRepository, PurchaseViewRepository purchaseViewRepository) {
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

    public Optional<UUID> updatePurchase(PurchaseDTO purchaseDTO) {
        Optional<Purchase> optionalPurchase = purchaseRepository.findById(purchaseDTO.getPurchaseId());

        return optionalPurchase.map(purchase -> {
            Purchase newPurchase = Purchase.builder()
                    .id(purchase.getId())
                    .date(purchaseDTO.getDate())
                    .paid(purchaseDTO.isPaid())
                    .userId(purchase.getUserId())
                    .build();

            purchaseRepository.save(newPurchase);

            purchaseDTO.getProducts().forEach(productString -> {
                Product product = productRepository.findByType(productString);
                Optional<PurchasedProduct> optionalPurchasedProduct = purchasedProductsRepository.findByPurchaseIdAndProductId(purchase.getId(), product.getId());

                if (optionalPurchasedProduct.isPresent()) {
                    purchasedProductsRepository.save(optionalPurchasedProduct.get());

                } else {
                    PurchasedProduct purchasedProduct = new PurchasedProduct(purchase.getId(), product.getId());
                    purchasedProductsRepository.save(purchasedProduct);
                }
            });
            return purchase.getId();
        });
    }
}
