package com.nemo.broilerbackend.repository;

import com.nemo.broilerbackend.product.Product;
import com.nemo.broilerbackend.product.ProductRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class ProductRepositoryTests {
    @Autowired
    private ProductRepository productRepository;

    private Product product;

    private static Product buildProduct() {
        return Product.builder()
                .type("ProductType")
                .build();
    }

    @BeforeEach
    public void setup() {
        product = buildProduct();
    }

    @Test
    public void productRepository_save_ReturnNotNull() {
        Product savedProduct = productRepository.save(product);

        Assertions.assertNotNull(savedProduct);
    }

    @Test
    public void productRepository_save_ReturnCorrectProduct() {
        Product savedProduct = productRepository.save(product);

        Assertions.assertEquals(product.getType(), savedProduct.getType());
    }

    @Test
    public void productRepository_findByType_ReturnNotNull() {
        productRepository.save(product);
        Product foundProduct = productRepository.findByType(product.getType());

        Assertions.assertNotNull(foundProduct);
    }

    @Test
    public void productRepository_findByType_ReturnCorrectProduct() {
        productRepository.save(product);
        Product foundProduct = productRepository.findByType(product.getType());

        Assertions.assertEquals(product.getType(), foundProduct.getType());
    }

    @Test
    public void productRepository_existsByType_ReturnTrue() {
        productRepository.save(product);
        Assertions.assertTrue(productRepository.existsByType(product.getType()));
    }

    @Test
    public void productRepository_existsByType_ReturnFalseWhenNoProductExists() {
        Assertions.assertFalse(productRepository.existsByType(product.getType()));
    }

    @Test
    public void productRepository_existsByType_ReturnFalseWhenWrongProduct() {
        productRepository.save(product);
        Assertions.assertFalse(productRepository.existsByType(product.getType() + "Not a type"));
    }


}
