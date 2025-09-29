package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.readmodel.purchaseView.PurchaseView;
import lombok.*;

import java.time.Instant;
import java.util.Arrays;
import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO {
    private String givenName;
    private String surname;
    private Instant date;
    private List<String> products;
    private boolean paid;
    private double price;

    public PurchaseDTO(PurchaseView purchaseView) {
        this.givenName = purchaseView.getGivenName();
        this.surname = purchaseView.getSurname();
        this.date = purchaseView.getDate();
        this.products = purchaseView.getProducts();
        this.paid = purchaseView.isPaid();
        this.price = purchaseView.getPrice();
    }
}
