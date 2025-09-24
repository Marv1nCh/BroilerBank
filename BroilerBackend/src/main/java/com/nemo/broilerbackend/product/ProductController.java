package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping(path = "/unique")
    public List<ProductDTO> getAllUniqueProducts() {
        return productService.getUniqueProducts();
    }

    @PostMapping
    public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
        return new ProductDTO(productService.addProduct(productDTO));
    }
}
