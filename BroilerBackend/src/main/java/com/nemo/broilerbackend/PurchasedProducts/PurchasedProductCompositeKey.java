package com.nemo.broilerbackend.PurchasedProducts;

import java.io.Serializable;
import java.util.UUID;

public class PurchasedProductCompositeKey implements Serializable {
    private UUID purchaseId;
    private UUID productId;
}
