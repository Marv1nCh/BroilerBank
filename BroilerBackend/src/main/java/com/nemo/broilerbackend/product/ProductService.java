package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import com.nemo.broilerbackend.productPrices.ProductPriceRepository;
import com.nemo.broilerbackend.productPrices.ProductPrice;
import com.nemo.broilerbackend.readmodel.productsPricesView.ProductPriceView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductPriceRepository productPriceRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductPriceRepository productPriceRepository) {
        this.productRepository = productRepository;
        this.productPriceRepository = productPriceRepository;
    }

    public List<ProductDTO> getAllUniqueProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(product -> {
            //TODO change hardcoded values
            ProductPriceView productPriceView = ProductPriceView.builder()
                    .id(product.getId())
                    .price(-1)
                    .startDate(LocalDate.now())
                    .type(product.getType())
                    .build();
            return new ProductDTO(productPriceView);
        }).toList();
    }

    public ProductDTO addProduct(ProductDTO productDTO) {
        boolean productExists = productRepository.existsByType(productDTO.getType());
        Product product = productExists ? productRepository.findByType(productDTO.getType()) : Product.builder()
                .type(productDTO.getType())
                .build();
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
