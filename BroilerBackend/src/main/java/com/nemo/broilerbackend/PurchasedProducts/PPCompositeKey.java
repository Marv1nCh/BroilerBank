package com.nemo.broilerbackend.PurchasedProducts;

import java.io.Serializable;
import java.util.UUID;

public class PPCompositeKey implements Serializable {
    private UUID purchaseId;
    private String product;
}
