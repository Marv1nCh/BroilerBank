package com.nemo.broilerbackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nemo.broilerbackend.dto.PurchaseDTO;
import com.nemo.broilerbackend.purchase.Purchase;
import com.nemo.broilerbackend.purchase.PurchaseController;
import com.nemo.broilerbackend.purchase.PurchaseService;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseView;
import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseViewService;
import com.nemo.broilerbackend.user.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@WebMvcTest(controllers = PurchaseController.class)
@AutoConfigureMockMvc(addFilters = false)
public class PurchaseControllerTests {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private PurchaseService purchaseService;
    @Autowired
    private PurchaseViewService purchaseViewService;
    @Autowired
    private ObjectMapper objectMapper;

    private static Purchase purchase;
    private static PurchaseDTO purchaseDTO;
    private static PurchaseView purchaseView1;
    private static PurchaseView purchaseView2;
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
                .date(Instant.now())
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

    private static PurchaseView buildPurchaseView() {
        return PurchaseView.builder()
                .purchaseId(purchase.getId())
                .date(purchase.getDate())
                .paid(false)
                .givenName(user.getGivenName())
                .surname(user.getSurname())
                .products(Collections.emptyList())
                .build();
    }

    private ResultActions performCreatePurchase() throws Exception {
        given(purchaseService.addNewPurchase(ArgumentMatchers.any()))
                .willAnswer(invocation -> Optional.of(purchase.getId()));

        given(purchaseViewService.findById(ArgumentMatchers.any()))
                .willAnswer(invocation -> Optional.of(purchaseView1));

        return mockMvc.perform(post("/purchases")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(purchaseDTO)));
    }

    @BeforeEach
    public void setup() {
        user = buildUser();
        purchase = buildPurchase();
        purchaseDTO = buildPurchaseDTO();
        purchaseView1 = buildPurchaseView();
        purchaseView2 = buildPurchaseView();
    }

    @TestConfiguration
    static class PurchaseControllerTestsContextConfiguration {
        @Bean
        public PurchaseService purchaseService() {
            return Mockito.mock(PurchaseService.class);
        }

        @Bean
        public PurchaseViewService purchaseViewService() {
            return Mockito.mock(PurchaseViewService.class);
        }
    }

    @Test
    public void PurchaseController_CreatePurchase_ReturnsNotNull() throws Exception {
        ResultActions response = performCreatePurchase();

        response.andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    public void PurchaseController_CreatePurchase_ReturnsNotNUllPurchaseDto() throws Exception {
        ResultActions response = performCreatePurchase();

        String json = response.andReturn().getResponse().getContentAsString();
        PurchaseDTO responsePurchaseDto = objectMapper.readValue(json, PurchaseDTO.class);

        Assertions.assertNotNull(responsePurchaseDto);
    }

    @Test
    public void PurchaseController_CreatePurchase_ReturnsCorrectPurchaseDto() throws Exception {
        ResultActions response = performCreatePurchase();

        String json = response.andReturn().getResponse().getContentAsString();
        PurchaseDTO responsePurchaseDto = objectMapper.readValue(json, PurchaseDTO.class);

        Assertions.assertEquals(purchaseDTO.getGivenName(), responsePurchaseDto.getGivenName());
        Assertions.assertEquals(purchaseDTO.getSurname(), responsePurchaseDto.getSurname());

        Instant purchaseDTODate = purchaseDTO.getDate().truncatedTo(ChronoUnit.MINUTES);
        Instant responsePurchaseDTODate = purchaseDTO.getDate().truncatedTo(ChronoUnit.MINUTES);
        Assertions.assertEquals(purchaseDTODate, responsePurchaseDTODate);
    }

    @Test
    public void PurchaseController_GetAllPurchases_ReturnsNotNull() throws Exception {
        given(purchaseViewService.findAll())
                .willReturn(Collections.emptyList());

        ResultActions response = mockMvc.perform(get("/purchases")
                .contentType(MediaType.APPLICATION_JSON));

        Assertions.assertNotNull(response);
    }

    @Test
    public void PurchaseController_GetAllPurchases_ReturnsNotNUllPurchaseDto() throws Exception {
        given(purchaseViewService.findAll())
            .willReturn(Collections.singletonList(purchaseView1));

        ResultActions response = mockMvc.perform(get("/purchases")
                .contentType(MediaType.APPLICATION_JSON));

        String json = response.andReturn().getResponse().getContentAsString();
        List<PurchaseDTO> responsePurchaseDto = objectMapper.readValue(json, new TypeReference<>() {});

        Assertions.assertNotNull(responsePurchaseDto);
    }

    @Test
    public void PurchaseController_GetAllPurchases_ReturnsCorrectPurchaseDto() throws Exception {
        given(purchaseViewService.findAll())
                .willReturn(Arrays.asList(purchaseView1, purchaseView2));

        ResultActions response = mockMvc.perform(get("/purchases")
                .contentType(MediaType.APPLICATION_JSON));

        String json = response.andReturn().getResponse().getContentAsString();
        List<PurchaseDTO> responsePurchaseDto = objectMapper.readValue(json, new TypeReference<>() {});

        Assertions.assertEquals(2, responsePurchaseDto.size());

    }
}
