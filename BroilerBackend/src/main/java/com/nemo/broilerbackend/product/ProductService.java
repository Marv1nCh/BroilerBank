package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.dto.DateRequest;
import com.nemo.broilerbackend.model.ProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.List;

@Component
public class ProductService {

    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //TODO Change so that some kind of dictionary is returned, where producttype and date can be matched to a specific price
    public Dictionary<ProductType, Double> getPriceOfProductAtTime(DateRequest dateRequest) {
        Dictionary<ProductType, Double> prices = new Hashtable<>();
        Dictionary<ProductType, Date> latestDates = new Hashtable<>();

        for (Product p : getAllProducts()) {
            if (p.getStart_date().before(dateRequest.getDate())) {
                prices.put(p.getType(), p.getPrice());
                latestDates.put(p.getType(), p.getStart_date());
            }
        }
        return prices;
    }

    public Product addProduct(Product product) {
        product.setId(null);
        return productRepository.save(product);
    }
}
