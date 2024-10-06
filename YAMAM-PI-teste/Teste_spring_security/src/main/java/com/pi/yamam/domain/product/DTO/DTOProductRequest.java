package com.pi.yamam.domain.product.DTO;

import java.math.BigDecimal;

public record DTOProductRequest(
        String name,
        String description,
        BigDecimal price,
        double rating,
        int stock
) {
}
