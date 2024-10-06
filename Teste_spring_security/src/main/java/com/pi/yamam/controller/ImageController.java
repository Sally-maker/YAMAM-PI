package com.pi.yamam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pi.yamam.domain.images.Images;
import com.pi.yamam.repositories.ImageRepository;
import com.pi.yamam.repositories.ProductRepository;
import com.pi.yamam.service.ImageService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("images")
public class ImageController {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageService imageService;

    @GetMapping("/{id}")
    public Images getImages(@PathVariable Long id) {
        return imageRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Image not found"));

    }

    @PostMapping("/{id}")
    public ResponseEntity<String> uploadImages(@RequestParam("img") List<MultipartFile> files, @PathVariable Long id) {

        imageService.uploadImages(files, id);
        return ResponseEntity.ok("Images uploaded");

    }

    @GetMapping("/main")
    public ResponseEntity<List<String>> getMainImages() {
        List<String> images = imageRepository.findMainImages(); // Caminhos parciais das imagens
        return ResponseEntity.ok().body(images);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<String>> getProductImages(@PathVariable Long id) {
        List<String> images = imageRepository.findImagesProduct(id);
        return ResponseEntity.ok().body(images);
    }

}
