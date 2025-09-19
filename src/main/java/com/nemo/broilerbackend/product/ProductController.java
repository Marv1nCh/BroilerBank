package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.DateRequest;
import com.nemo.broilerbackend.model.ProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Dictionary;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200") //TODO delete
@RestController
@RequestMapping(path = "/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping("/prices")
    public Dictionary<ProductType, Double> getPrice(@RequestBody DateRequest dateRequest) {
        return productService.getPriceOfProductAtTime(dateRequest);
    }
}
