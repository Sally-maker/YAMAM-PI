package com.pi.yamam.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pi.yamam.domain.images.Images;

public interface ImageRepository extends JpaRepository<Images, Long>{
    
    @Query("SELECT i.imagePath FROM Images i WHERE i.isMain = true")
    List<String> findMainImages();
    
    @Query("SELECT i.imagePath FROM Images i WHERE i.product.id = :productId")
    List<String> findImagesProduct(@Param("productId") Long productId);
}
