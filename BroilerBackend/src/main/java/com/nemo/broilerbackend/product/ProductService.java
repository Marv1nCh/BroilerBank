package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.ProductDTO;
import com.nemo.broilerbackend.productPrices.ProductPriceRepository;
import com.nemo.broilerbackend.productPrices.ProductPrice;
import com.nemo.broilerbackend.readmodel.productsPricesView.ProductPriceView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

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
        return productRepository.streamAllBy()
                .map(ProductService::toDto)
                .toList();
    }

    public ProductDTO upsertProduct(ProductDTO productDTO) {
        UUID productId = productDTO.getProductId();

        if(productId == null) {
            productId = getOrCreateProductOfType(productDTO.getType());
        }

        addProductPrice(productId, productDTO.getStartDate(), productDTO.getPrice());
        productDTO.setProductId(productId);
        return productDTO;
    }

    @Transactional
    public void deleteProduct(UUID productId, double price) {
        assertItsNotTheLastProductPrice(productId);
        productPriceRepository.deleteByProductIdAndPrice(productId, price);
    }

    private UUID getOrCreateProductOfType(String productType) {
        var product = productRepository.findByType(productType);
        return product != null
                ? product.getId()
                : createProductOfType(productType);
    }

    private UUID createProductOfType(String productType) {
        Product product = Product.builder()
                .type(productType)
                .build();
        return productRepository.save(product).getId();
    }

    private void addProductPrice(UUID productId, LocalDate startDate, double price) {
        ProductPrice productPrice = ProductPrice.builder()
                .productId(productId)
                .startDate(startDate)
                .price(price)
                .build();

        productPriceRepository.save(productPrice);
    }

    private void assertItsNotTheLastProductPrice(UUID productId) {
        if (productPriceRepository.countByProductId(productId) <= 1) {
            throw new LastProductPriceException("Cannot delete the last price for this product.");
        }
    }

    private static ProductDTO toDto(Product product) {
        //TODO change hardcoded values
        ProductPriceView productPriceView = ProductPriceView.builder()
                .id(product.getId())
                .price(-1)
                .startDate(LocalDate.now())
                .type(product.getType())
                .build();
        return new ProductDTO(productPriceView);
    }
}
