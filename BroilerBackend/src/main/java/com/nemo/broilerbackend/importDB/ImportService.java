package com.nemo.broilerbackend.importDB;

import com.nemo.broilerbackend.PurchasedProducts.PurchasedProduct;
import com.nemo.broilerbackend.PurchasedProducts.PurchasedProductsRepository;
import com.nemo.broilerbackend.importDB.transformers.ProductAndPriceTransformer;
import com.nemo.broilerbackend.importDB.transformers.PurchaseTransformer;
import com.nemo.broilerbackend.importDB.transformers.UserTransformer;
import com.nemo.broilerbackend.product.Product;
import com.nemo.broilerbackend.product.ProductRepository;
import com.nemo.broilerbackend.productPrices.ProductPrice;
import com.nemo.broilerbackend.productPrices.ProductPriceRepository;
import com.nemo.broilerbackend.purchase.Purchase;
import com.nemo.broilerbackend.purchase.PurchaseRepository;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.util.Optional;
import java.util.UUID;

@Component
public class ImportService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final PurchaseRepository purchaseRepository;
    private final PurchasedProductsRepository purchasedProductsRepository;
    private final ProductPriceRepository productPriceRepository;

    @Autowired
    public ImportService(UserRepository userRepository, ProductRepository productRepository, PurchaseRepository purchaseRepository, PurchasedProductsRepository purchasedProductsRepository, ProductPriceRepository productPriceRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.purchaseRepository = purchaseRepository;
        this.purchasedProductsRepository = purchasedProductsRepository;
        this.productPriceRepository = productPriceRepository;
    }

    public void importUsersFromCsv(MultipartFile file) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;

            while ((line = reader.readLine()) != null) {
                User userToImport = UserTransformer.parseToUser(line);
                userRepository.save(userToImport);
            }
        }
    }

    public void importProductsAndPricesFromCsv(MultipartFile file) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;

            while ((line = reader.readLine()) != null) {
                Product product = ProductAndPriceTransformer.parseToProduct(line);
                UUID productId;
                if (!productRepository.existsByType(product.getType())) {
                    Product savedProduct = productRepository.save(product);
                    productId = savedProduct.getId();
                } else {
                    Product savedProduct = productRepository.getByType(product.getType());
                    productId = savedProduct.getId();
                }

                ProductPrice productPrice = ProductAndPriceTransformer.parseToProductPrice(line, productId);
                productPriceRepository.save(productPrice);

            }
        }
    }

    public void importPurchasesFromCsv(MultipartFile file) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;

            while ((line = reader.readLine()) != null) {
                User user = UserTransformer.parsePurchaseToUser(line);

                Optional<User> foundUser = userRepository.findByGivenNameAndSurname(user.getGivenName(), user.getSurname());
                if (foundUser.isPresent()) {
                    UUID userId = foundUser.get().getId();

                    Purchase purchase = PurchaseTransformer.parseToPurchase(line, userId);
                    Purchase savedPurchase = purchaseRepository.save(purchase);

                    Product productBroiler = productRepository.findByType("broiler");
                    Product productFries = productRepository.findByType("fries");
                    Product productColeslaw = productRepository.findByType("coleslaw");

                    for (int i = 0; i < PurchaseTransformer.parseToBroiler(line); i++) {
                        PurchasedProduct purchasedProduct = PurchaseTransformer.parseToPurchasedProduct(productBroiler.getId(), savedPurchase.getId());
                        purchasedProductsRepository.save(purchasedProduct);
                    }
                    for (int i = 0; i < PurchaseTransformer.parseToFries(line); i++) {
                        PurchasedProduct purchasedProduct = PurchaseTransformer.parseToPurchasedProduct(productFries.getId(), savedPurchase.getId());
                        purchasedProductsRepository.save(purchasedProduct);
                    }
                    for (int i = 0; i < PurchaseTransformer.parseToColeslaw(line); i++) {
                        PurchasedProduct purchasedProduct = PurchaseTransformer.parseToPurchasedProduct(productColeslaw.getId(), savedPurchase.getId());
                        purchasedProductsRepository.save(purchasedProduct);
                    }
                }
            }
        }
    }
}
