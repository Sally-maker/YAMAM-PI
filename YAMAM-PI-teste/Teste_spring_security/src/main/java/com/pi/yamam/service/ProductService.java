package com.pi.yamam.service;

import com.pi.yamam.domain.product.Product;
import com.pi.yamam.domain.product.DTO.DTOProductRequest;
import com.pi.yamam.domain.user.Status;
import com.pi.yamam.domain.user.User;
import com.pi.yamam.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product createProduct(DTOProductRequest productRequest) {
        Product product = new Product(
                null,
                productRequest.name(),
                productRequest.description(),
                productRequest.rating(),
                Status.ACTIVE,
                productRequest.price(),
                productRequest.stock()
        );

        Product newProduct = productRepository.save(product);
        return newProduct;
    }
    public Product updateStatus(long id) {
        Product product = this.productRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        if (product.getStatus().equals(Status.ACTIVE)) {
            product.setStatus(Status.INACTIVE);
        } else {
            product.setStatus(Status.ACTIVE);
        }
        this.productRepository.save(product);
        return product;
    }
}
