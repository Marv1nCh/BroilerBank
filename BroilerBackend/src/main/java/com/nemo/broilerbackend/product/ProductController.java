package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import com.nemo.broilerbackend.readmodel.productsPricesView.ProductPriceViewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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
    public ProductDTO upsertProduct(@RequestBody ProductDTO productDTO) {
        return productService.upsertProduct(productDTO);
    }

    @DeleteMapping(path = "/{productId}/{price}")
    public ResponseEntity<?> deleteProduct(@PathVariable UUID productId, @PathVariable double price) {
        try {
            productService.deleteProduct(productId, price);
            return ResponseEntity.ok().build();
        } catch (LastProductPriceException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server error");
        }
    }
}
