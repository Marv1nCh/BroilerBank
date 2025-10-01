package com.nemo.broilerbackend.repository;

import com.nemo.broilerbackend.purchase.Purchase;
import com.nemo.broilerbackend.purchase.PurchaseRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.UUID;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class PurchaseRepositoryTests {

    @Autowired
    private PurchaseRepository purchaseRepository;

    private Purchase purchase;

    private static Purchase buildPurchase() {
        return Purchase.builder()
                .userId(UUID.randomUUID())
                .date(LocalDate.now())
                .paid(false)
                .build();
    }

    @BeforeEach
    public void setup() {
        purchase = buildPurchase();
    }

    @Test
    public void purchaseRepository_Save_ReturnNotNull() {
        Purchase savedPurchase = purchaseRepository.save(purchase);

        Assertions.assertNotNull(savedPurchase);
    }

    @Test
    public void purchaseRepository_Save_ReturnCorrectPurchase() {
        Purchase savedPurchase = purchaseRepository.save(purchase);

        Assertions.assertEquals(savedPurchase.getUserId(), purchase.getUserId());
        Assertions.assertEquals(savedPurchase.getDate(), purchase.getDate());
    }
}
