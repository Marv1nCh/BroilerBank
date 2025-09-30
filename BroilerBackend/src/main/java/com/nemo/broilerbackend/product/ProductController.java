package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import com.nemo.broilerbackend.readmodel.productsPricesView.ProductPriceViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") //TODO delete
@RestController
@RequestMapping(path = "/products")
public class ProductController {

    private final ProductService productService;
    private final ProductPriceViewService productPriceViewService;

    @Autowired
    public ProductController(ProductService productService, ProductPriceViewService productPriceViewService) {
        this.productService = productService;
        this.productPriceViewService = productPriceViewService;
    }

    @GetMapping
    public List<ProductDTO> getAllProducts() {
        return productPriceViewService.getProductPriceViews().stream().map(ProductDTO::new).toList();
    }

    @GetMapping(path = "/unique")
    public List<ProductDTO> getAllUniqueProducts() {
        return productService.getAllUniqueProducts();
    }

    @PostMapping
    public ProductDTO createNewProduct(@RequestBody ProductDTO productDTO) {
        return productService.addProduct(productDTO);
    }
}
