package com.pi.yamam.domain.images.DTO;

import com.pi.yamam.domain.product.Product;

public record ImageRequestDTO(
        String pathImage,
        boolean isMain,
        Product product
) {
    
}
