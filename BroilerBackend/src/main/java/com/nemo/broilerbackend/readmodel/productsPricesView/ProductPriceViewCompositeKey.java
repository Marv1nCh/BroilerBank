package com.nemo.broilerbackend.readmodel.productsPricesView;

import java.io.Serializable;
import java.time.Instant;
import java.util.UUID;

public class ProductPriceViewCompositeKey implements Serializable {
    private UUID id;
    private Instant startDate;
}
