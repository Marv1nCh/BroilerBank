package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<ProductDTO> getUniqueProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .collect(Collectors.toMap(
                        Product::getType,
                        ProductDTO::new,
                        (existing, replacement) -> existing
                ))
                .values().stream().toList();
    }

    public Product addProduct(ProductDTO productDTO) {
        Product product = Product.builder()
                .price(productDTO.getPrice())
                .startDate(productDTO.getStartDate())
                .type(productDTO.getType())
                .build();

        return productRepository.save(product);
    }
}
