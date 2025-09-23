package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts().stream().map(ProductDTO::new).toList();
    }

    @PostMapping
    public Optional<Product> createProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }
}
