package com.nemo.broilerbackend.productPrices;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

public class ProductPriceCompositeKey implements Serializable {
    private UUID productId;
    private Instant startDate;
}
