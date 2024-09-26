package com.pi.yamam.domain.product;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

import com.pi.yamam.domain.images.Images;
import com.pi.yamam.domain.user.Status;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "product")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 200)
    private String name;

    @Column(length = 2000)
    private String description;

    private double rating;

    private Status status;

    @Column(precision = 10, scale = 2)
    private BigDecimal price;

    private int stock;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Images> images;

    public Product(Long id, String name, String description, double rating, Status status, BigDecimal price, int stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.price = price;
        this.stock = stock;
        this.status = status;
    }

}
