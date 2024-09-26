package com.pi.yamam.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pi.yamam.domain.images.Images;

public interface ImageRepository extends JpaRepository<Images, Long>{
    
}
