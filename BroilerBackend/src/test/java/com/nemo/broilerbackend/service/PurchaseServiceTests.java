package com.nemo.broilerbackend.service;

import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.purchase.Purchase;
import com.nemo.broilerbackend.purchase.PurchaseRepository;
import com.nemo.broilerbackend.purchase.PurchaseService;
import com.nemo.broilerbackend.user.User;
import com.nemo.broilerbackend.user.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
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

    @InjectMocks
    PurchaseService purchaseService;

    private static Purchase purchase;
    private static PurchaseDTO  purchaseDTO;
    private static User user;

    private static Purchase buildPurchase() {
        return Purchase.builder()
                .id(UUID.randomUUID())
                .userId(user.getId())
                .date(Instant.now())
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
    public void PurchaseService_AddNewPurchase_ReturnNotNull() {
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        when(purchaseRepository.save(Mockito.any(Purchase.class))).thenReturn(purchase);

        Optional<UUID> newPurchaseId = purchaseService.addNewPurchase(purchaseDTO);

        Assertions.assertNotNull(newPurchaseId);
        Assertions.assertTrue(newPurchaseId.isPresent());
    }

    @Test
    public void PurchaseService_AddNewPurchase_ReturnCorrectId() {
        when(userRepository.findByGivenNameAndSurname(Mockito.anyString(), Mockito.anyString())).thenReturn(Optional.ofNullable(user));
        when(purchaseRepository.save(Mockito.any(Purchase.class))).thenReturn(purchase);

        Optional<UUID> newPurchaseId = purchaseService.addNewPurchase(purchaseDTO);

        Assertions.assertEquals(purchase.getId(), newPurchaseId.get());
    }
}
