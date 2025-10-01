package com.nemo.broilerbackend.service;

import com.nemo.broilerbackend.dto.ProductDTO;
import com.nemo.broilerbackend.product.Product;
import com.nemo.broilerbackend.product.ProductRepository;
import com.nemo.broilerbackend.product.ProductService;
import com.nemo.broilerbackend.productPrices.ProductPrice;
import com.nemo.broilerbackend.productPrices.ProductPriceRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTests {

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProductPriceRepository productPriceRepository;

    @InjectMocks
    private ProductService productService;

    private static Product product1;
    private static Product product2;
    private static ProductPrice productPrice1;
    private static ProductDTO productDTO1;
    private static ProductDTO productDTO2;

    private static Product buildProduct(String type) {
        return Product.builder()
                .type(type)
                .build();
    }

    private static ProductPrice buildProductPrice(Product product) {
        return ProductPrice.builder()
                .price(5.5)
                .productId(product.getId())
                .startDate(LocalDate.now())
                .build();
    }

    private static ProductDTO buildProductDTO(Product product, ProductPrice productPrice) {
        return ProductDTO.builder()
                .type(product.getType())
                .price(productPrice.getPrice())
                .productId(product.getId())
                .startDate(productPrice.getStartDate())
                .build();
    }

    @BeforeEach
    void setUp() {
        product1 = buildProduct("Product1");
        product2 = buildProduct("Product2");
        productPrice1 = buildProductPrice(product1);
        ProductPrice productPrice2 = buildProductPrice(product2);
        productDTO1 = buildProductDTO(product1, productPrice1);
        productDTO2 = buildProductDTO(product2, productPrice2);
    }

    @Test
    public void productService_getAllUniqueProducts_returnNotNull() {
        when(productRepository.findAll()).thenReturn(List.of(product1, product2));

        List<ProductDTO> productDTOs = productService.getAllUniqueProducts();

        Assertions.assertNotNull(productDTOs);
    }

    @Test
    public void productService_getAllUniqueProducts_returnCorrectNumberOfProducts() {
        when(productRepository.findAll()).thenReturn(List.of(product1, product2));

        List<ProductDTO> productDTOs = productService.getAllUniqueProducts();

        Assertions.assertEquals(2, productDTOs.size());
    }

    @Test
    public void productService_getAllUniqueProducts_returnCorrectProducts() {
        when(productRepository.findAll()).thenReturn(List.of(product1, product2));

        List<ProductDTO> productDTOs = productService.getAllUniqueProducts();
        List<String> productTypes = productDTOs.stream().map(ProductDTO::getType).toList();

        Assertions.assertTrue(productTypes.contains(productDTO1.getType()));
        Assertions.assertTrue(productTypes.contains(productDTO2.getType()));
    }

    @Test
    public void productService_addProduct_returnNotNullWhenNotExisting() {
        when(productRepository.existsByType(Mockito.any())).thenReturn(false);
        when(productRepository.save(Mockito.any(Product.class))).thenReturn(product1);
        when(productPriceRepository.save(Mockito.any(ProductPrice.class))).thenReturn(productPrice1);

        ProductDTO productDTO = productService.addProduct(productDTO1);

        Assertions.assertNotNull(productDTO);
    }

    @Test
    public void productService_addProduct_returnNotNullWhenExistingForNewProduct() {
        when(productRepository.existsByType(Mockito.any())).thenReturn(true);
        when(productRepository.findByType(Mockito.any())).thenReturn(product1);
        when(productPriceRepository.save(Mockito.any(ProductPrice.class))).thenReturn(productPrice1);

        ProductDTO productDTO = productService.addProduct(productDTO1);

        Assertions.assertNotNull(productDTO);
    }

    @Test
    public void productService_addProduct_returnNotNullWhenExistingForExistingProduct() {
        Product productForThisTest = Product.builder()
                .id(UUID.randomUUID())
                .type(product1.getType())
                .build();
        ProductDTO productDTOForThisTest = ProductDTO.builder()
                .price(productDTO1.getPrice())
                .type(productDTO1.getType())
                .startDate(productDTO1.getStartDate())
                .productId(productForThisTest.getId())
                .build();

        when(productRepository.existsById(Mockito.any())).thenReturn(true);
        when(productPriceRepository.save(Mockito.any(ProductPrice.class))).thenReturn(productPrice1);

        ProductDTO productDTO = productService.addProduct(productDTOForThisTest);

        Assertions.assertNotNull(productDTO);
    }

    @Test
    public void productService_addProduct_returnCorrectProductDTOWhenNotExisting() {
        when(productRepository.existsByType(Mockito.any())).thenReturn(false);
        when(productRepository.save(Mockito.any(Product.class))).thenReturn(product1);
        when(productPriceRepository.save(Mockito.any(ProductPrice.class))).thenReturn(productPrice1);

        ProductDTO productDTO = productService.addProduct(productDTO1);

        Assertions.assertEquals(productDTO1.getType(), productDTO.getType());
        Assertions.assertEquals(productDTO1.getPrice(), productDTO.getPrice());
        Assertions.assertEquals(productDTO1.getStartDate(), productDTO.getStartDate());
    }

    @Test
    public void productService_addProduct_returnCorrectProductDTOWhenExistingForNewProductPrice() {
        when(productRepository.existsByType(Mockito.any())).thenReturn(true);
        when(productRepository.findByType(Mockito.any())).thenReturn(product1);
        when(productPriceRepository.save(Mockito.any(ProductPrice.class))).thenReturn(productPrice1);

        ProductDTO productDTO = productService.addProduct(productDTO1);

        Assertions.assertEquals(productDTO1.getType(), productDTO.getType());
        Assertions.assertEquals(productDTO1.getPrice(), productDTO.getPrice());
        Assertions.assertEquals(productDTO1.getStartDate(), productDTO.getStartDate());
    }

    @Test
    public void productService_addProduct_returnCorrectProductDTOWhenExistingForExistingProduct() {
        Product productForThisTest = Product.builder()
                .id(UUID.randomUUID())
                .type(product1.getType())
                .build();
        ProductDTO productDTOForThisTest = ProductDTO.builder()
                .price(productDTO1.getPrice())
                .type(productDTO1.getType())
                .startDate(productDTO1.getStartDate())
                .productId(productForThisTest.getId())
                .build();

        when(productRepository.existsById(Mockito.any())).thenReturn(true);
        when(productPriceRepository.save(Mockito.any(ProductPrice.class))).thenReturn(productPrice1);

        ProductDTO productDTO = productService.addProduct(productDTOForThisTest);

        Assertions.assertEquals(productDTO1.getType(), productDTO.getType());
        Assertions.assertEquals(productDTO1.getPrice(), productDTO.getPrice());
        Assertions.assertEquals(productDTO1.getStartDate(), productDTO.getStartDate());
    }
}
