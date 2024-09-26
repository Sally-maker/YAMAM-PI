package com.pi.yamam.domain.product.DTO;

import java.math.BigDecimal;

import com.pi.yamam.domain.user.Status;

public record DTOResponseProduct(
        Long id,
        String name,
        String description,
        double rating,
        Status status,
        BigDecimal price, 
        int stock) {

}
