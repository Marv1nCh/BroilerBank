package com.nemo.broilerbackend.product;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.stream.Stream;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    Product findByType(String type);

    boolean existsByType(String type);

    Product getByType(String type);

    Stream<Product> streamAllBy();
}
