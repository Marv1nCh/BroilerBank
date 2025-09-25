package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import com.nemo.broilerbackend.productPrices.ProductPriceRepository;
import com.nemo.broilerbackend.productPrices.ProductPrice;
import com.nemo.broilerbackend.readmodel.productsPricesView.ProductPriceViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductPriceRepository productPriceRepository;
    private final ProductPriceViewRepository productPriceViewRepository;

    @Autowired
    public ProductService(ProductRepository productRepository,
                          ProductPriceRepository productPriceRepository, ProductPriceViewRepository productPriceViewRepository) {
        this.productRepository = productRepository;
        this.productPriceRepository = productPriceRepository;
        this.productPriceViewRepository = productPriceViewRepository;
    }

    public List<ProductDTO> getAllProducts() {
        return productPriceViewRepository.findAll().stream().map(ProductDTO::new).toList();
    }

    public ProductDTO addProduct(ProductDTO productDTO) {
        boolean productExists = productRepository.existsByType(productDTO.getType());
        Product product = productExists ? productRepository.findByType(productDTO.getType()) : Product.builder().type(productDTO.getType()).build();
        if (!productExists) {
            productRepository.save(product);
        }
        ProductPrice productPrice = ProductPrice.builder()
                .productId(product.getId())
                .startDate(productDTO.getStartDate())
                .price(productDTO.getPrice())
                .build();

        productPriceRepository.save(productPrice);
        return productDTO;
    }
}
