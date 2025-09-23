package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

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

    public Product addProduct(ProductDTO productDTO) {
        System.out.println(productDTO.getType());
        Product product = Product.builder()
                .price(productDTO.getPrice())
                .startDate(productDTO.getStartDate())
                .type(productDTO.getType())
                .build();
        System.out.println(product.getType());
        return productRepository.save(product);
    }
}
