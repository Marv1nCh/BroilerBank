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

import java.util.*;

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
        Optional<User> optionalUser = userRepository.findByGivenNameAndSurname(purchaseDTO.getGivenName(), purchaseDTO.getSurname());

        return optionalUser.map(user -> {
            Purchase savedPurchase = savePurchase(purchaseDTO, user);

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
        Optional<User> userOfPurchase = userRepository.findByGivenNameAndSurname(purchaseDTO.getGivenName(), purchaseDTO.getSurname());

        return userOfPurchase.flatMap(foundUser -> optionalPurchase.map(purchase -> {
            savePurchase(purchaseDTO, purchase.getId(), foundUser);

            return updatePurchasedProducts(purchaseDTO, purchase.getId());
        }));
    }




    private Purchase savePurchase(PurchaseDTO purchaseDTO, User user) {
        Purchase newPurchase = Purchase.builder()
                .date(purchaseDTO.getDate())
                .paid(purchaseDTO.isPaid())
                .userId(user.getId())
                .build();

        return purchaseRepository.save(newPurchase);
    }

    private void savePurchase(PurchaseDTO purchaseDTO, UUID purchaseId, User user) {
        Purchase newPurchase = Purchase.builder()
                .id(purchaseId)
                .date(purchaseDTO.getDate())
                .paid(purchaseDTO.isPaid())
                .userId(user.getId())
                .build();

        purchaseRepository.save(newPurchase);
    }

    private UUID updatePurchasedProducts(PurchaseDTO purchaseDTO, UUID productId) {
        List<PurchasedProduct> purchasedProductList = purchasedProductsRepository.findByPurchaseId(productId);
        Set<UUID> accessedProductIds = new HashSet<>();

        updateExistingProducts(purchaseDTO, productId, accessedProductIds, purchasedProductList);

        deleteNonExistingProducts(purchasedProductList, accessedProductIds);

        return productId;
    }

    private void updateExistingProducts(PurchaseDTO purchaseDTO, UUID productId, Set<UUID> accessedProductIds, List<PurchasedProduct> purchasedProductList) {
        List<UUID> productIdList = purchasedProductList.stream().map(PurchasedProduct::getProductId).toList();

        purchaseDTO.getProducts().forEach(productString -> {
            Product product = productRepository.findByType(productString);
            int productIndex = productIdList.indexOf(product.getId());
            accessedProductIds.add(product.getId());

            PurchasedProduct purchasedProduct = productIndex >= 0 ? purchasedProductList.get(productIndex) : new PurchasedProduct(productId, product.getId());
            purchasedProductsRepository.save(purchasedProduct);
        });
    }

    private void deleteNonExistingProducts(List<PurchasedProduct> purchasedProductList, Set<UUID> accessedProductIds) {
        purchasedProductList.forEach(purchasedProduct -> {
            if (!accessedProductIds.contains(purchasedProduct.getProductId())) {
                purchasedProductsRepository.delete(purchasedProduct);
            }
        });
    }
}
