package com.nemo.broilerbackend.service;

import com.nemo.broilerbackend.PurchasedProducts.PurchasedProduct;
import com.nemo.broilerbackend.PurchasedProducts.PurchasedProductsRepository;
import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.product.ProductRepository;
import com.nemo.broilerbackend.purchase.Purchase;
import com.nemo.broilerbackend.purchase.PurchaseRepository;
import com.nemo.broilerbackend.purchase.PurchaseService;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PurchaseServiceTests {

    @Mock
    PurchaseRepository purchaseRepository;

    @Mock
    UserRepository userRepository;

    @Mock
    PurchasedProductsRepository purchasedProductsRepository;

    @InjectMocks
    PurchaseService purchaseService;

    private static Purchase purchase;
    private static PurchaseDTO purchaseDTO;
    private static User user;

    private static Purchase buildPurchase() {
        return Purchase.builder()
                .id(UUID.randomUUID())
                .userId(user.getId())
                .date(LocalDate.now())
                .paid(false)
                .build();
    }

    private static PurchaseDTO buildPurchaseDTO() {
        return PurchaseDTO.builder()
                .price(10)
                .surname(user.getSurname())
                .givenName(user.getGivenName())
                .products(Collections.emptyList())
                .paid(false)
                .build();
    }

    private static User buildUser() {
        return User.builder()
                .id(UUID.randomUUID())
                .givenName("testUserFirstName")
                .surname("testUserSurname")
                .displayName("testUserDisplayName")
                .email("testUser@TestEmail.de")
                .userType("TestUserType")
                .userPrincipleName("testUserPrincipleName")
                .accountEnabled(true)
                .userType("Admin")
                .roles(Collections.emptyList())
                .build();
    }

    @BeforeEach
    public void setUp() {
        user = buildUser();
        purchase = buildPurchase();
        purchaseDTO = buildPurchaseDTO();
    }

    @Test
    public void purchaseService_addNewPurchase_returnNotNull() {
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        when(purchaseRepository.save(Mockito.any(Purchase.class))).thenReturn(purchase);

        Optional<UUID> newPurchaseId = purchaseService.addNewPurchase(purchaseDTO);

        Assertions.assertNotNull(newPurchaseId);
        Assertions.assertTrue(newPurchaseId.isPresent());
    }

    @Test
    public void purchaseService_addNewPurchase_returnCorrectId() {
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        when(purchaseRepository.save(Mockito.any(Purchase.class))).thenReturn(purchase);

        Optional<UUID> newPurchaseId = purchaseService.addNewPurchase(purchaseDTO);

        Assertions.assertEquals(purchase.getId(), newPurchaseId.get());
    }

    @Test
    public void purchaseService_updatePurchase_returnNotNull() {
        when(purchaseRepository.findById(Mockito.any())).thenReturn(Optional.of(purchase));
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        when(purchaseRepository.save(Mockito.any(Purchase.class))).thenReturn(purchase);
        when(purchasedProductsRepository.findByPurchaseId(Mockito.any())).thenReturn(Collections.emptyList());

        Optional<UUID> newPurchaseId = purchaseService.updatePurchase(purchaseDTO);

        Assertions.assertNotNull(newPurchaseId);
    }

    @Test
    public void purchaseService_updatePurchase_returnNotNullWhenNoExistingPurchase() {
        when(purchaseRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.empty());

        Optional<UUID> newPurchaseId = purchaseService.updatePurchase(purchaseDTO);

        Assertions.assertNotNull(newPurchaseId);
    }

    @Test
    public void purchaseService_updatePurchase_returnEmptyOptionalWhenNoExistingPurchase() {
        when(purchaseRepository.findById(Mockito.any())).thenReturn(Optional.empty());
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.empty());

        Optional<UUID> newPurchaseId = purchaseService.updatePurchase(purchaseDTO);

        Assertions.assertEquals(Optional.empty(), newPurchaseId);
    }

    @Test
    public void purchaseService_updatePurchase_returnCorrectId() {
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        when(purchaseRepository.save(Mockito.any(Purchase.class))).thenReturn(purchase);

        Optional<UUID> newPurchaseId = purchaseService.addNewPurchase(purchaseDTO);

        Assertions.assertEquals(purchase.getId(), newPurchaseId.get());
    }
}
