package com.nemo.broilerbackend.importDB.transformers;


import com.nemo.broilerbackend.PurchasedProducts.PurchasedProduct;
import com.nemo.broilerbackend.purchase.Purchase;

import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

public class PurchaseTransformer {

    public static Purchase parseToPurchase(String line, UUID userId) {
        System.out.println("Parsing Purchase from line " + line);
        String[] file = line.split(",");

        LocalDate createdAt = LocalDate.parse(file[3]);
        boolean hasPaid = Objects.equals(file[7], "t");

        return Purchase.builder()
                .userId(userId)
                .date(createdAt)
                .paid(hasPaid)
                .build();
    }

    public static PurchasedProduct parseToPurchasedProduct(UUID productId, UUID purchaseId) {
        return PurchasedProduct.builder()
                .purchaseId(purchaseId)
                .productId(productId)
                .build();
    }

    public static int parseToBroiler(String line) {
        String[] file = line.split(",");
        return Integer.parseInt(file[4]);
    }

    public static int parseToFries(String line) {
        String[] file = line.split(",");
        return Integer.parseInt(file[5]);
    }

    public static int parseToColeslaw(String line) {
        String[] file = line.split(",");
        return Integer.parseInt(file[6]);
    }
}
