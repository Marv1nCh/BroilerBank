package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.model.ProductType;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "broiler_price")
public class Product {
    @Id
    private Long id;

    private Date start_date;

    @Enumerated(EnumType.STRING)
    private ProductType type;

    private double price;

    public Product() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public ProductType getType() {
        return type;
    }

    public void setType(ProductType type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
