package com.nemo.broilerbackend.dto;

import com.nemo.broilerbackend.purchase.Purchase;
import com.nemo.broilerbackend.user.User;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
public class PurchaseDTO {
    private String givenName;
    private String surname;
    private Instant date;
    private List<String> products;
    private boolean paid;

    public PurchaseDTO(Purchase purchase, User user) {
        this.givenName = user.getGivenName();
        this.surname = user.getSurname();
        this.date = purchase.getDate();
        this.products = purchase.getProducts();
        this.paid = purchase.isPaid();
    }
}
