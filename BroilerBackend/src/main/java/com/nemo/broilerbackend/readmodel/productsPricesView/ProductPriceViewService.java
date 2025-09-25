package com.nemo.broilerbackend.readmodel.productsPricesView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductPriceViewService {

    private final ProductPriceViewRepository productPriceViewRepository;

    @Autowired
    public ProductPriceViewService(ProductPriceViewRepository productPriceViewRepository) {
        this.productPriceViewRepository = productPriceViewRepository;
    }

    public List<ProductPriceView> getProductPriceViews() {
        return productPriceViewRepository.findAll();
    }
}
