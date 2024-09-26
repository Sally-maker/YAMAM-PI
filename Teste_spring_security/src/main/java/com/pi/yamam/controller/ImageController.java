package com.pi.yamam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pi.yamam.repositories.ProductRepository;
import com.pi.yamam.service.ImageService;

@RestController
@RequestMapping("images")
public class ImageController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageService imageService;

    @PostMapping("/{id}")
    public ResponseEntity<String> uploadImages(@RequestParam("img") List<MultipartFile> files, @PathVariable Long id ) {
    
        imageService.uploadImages(files,id );
        return ResponseEntity.ok("Images uploaded");

    }
}
