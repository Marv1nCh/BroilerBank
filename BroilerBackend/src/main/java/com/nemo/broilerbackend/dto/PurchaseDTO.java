package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseView;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO {
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID purchaseId;
    private String givenName;
    private String surname;
    private LocalDate date;
    private List<String> products;
    private boolean paid;
    private double price;

    public PurchaseDTO(PurchaseView purchaseView) {
        this.purchaseId = purchaseView.getPurchaseId();
        this.givenName = purchaseView.getGivenName();
        this.surname = purchaseView.getSurname();
        this.date = purchaseView.getDate();
        this.products = purchaseView.getProducts();
        this.paid = purchaseView.isPaid();
        this.price = purchaseView.getPrice();
    }
}
