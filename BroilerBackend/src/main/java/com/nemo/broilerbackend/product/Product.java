package com.nemo.broilerbackend.product;

import com.nemo.broilerbackend.model.ProductType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

@Setter
@Getter
@Entity
@Table(name = "broiler_price")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date startDate;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(columnDefinition = "broiler_menu")
    private ProductType type;

    private double price;

    public Product() {
    }

}
