package com.pi.yamam.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pi.yamam.domain.product.Product;
import com.pi.yamam.domain.product.DTO.DTOProductRequest;
import com.pi.yamam.domain.product.DTO.DTOResponseProduct;
import com.pi.yamam.domain.product.DTO.FreteRequestDTO;
import com.pi.yamam.repositories.ProductRepository;
import com.pi.yamam.service.FreteService;
import com.pi.yamam.service.ImageService;
import com.pi.yamam.service.ProductService;

@RestController

@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ImageService imageService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageController imageController;

    @Autowired
    private FreteService freteService;

    @PostMapping
    public ResponseEntity createProduct(@RequestBody DTOProductRequest productRequest) {
        Product product = productService.createProduct(productRequest);

        return ResponseEntity.ok(product);
    }

    @GetMapping("/{id}")
    public DTOResponseProduct getProductById(@PathVariable Long id) {
        Product product = productRepository.findById(id).orElseThrow(() -> new RuntimeException(("Product not found")));
        return new DTOResponseProduct(id, product.getName(), product.getDescription(), product.getRating(),
                product.getStatus(), product.getPrice(), product.getStock());
    }

    @GetMapping("/allProduct")
    public List<DTOResponseProduct> listProduct() {
        return productRepository.findAll().stream()
                .map(product -> new DTOResponseProduct(product.getId(), product.getName(),
                        product.getDescription(), product.getRating(), product.getStatus(), product.getPrice(),
                        product.getStock()))
                .collect(Collectors.toList());
    }

    @PutMapping("/status/{id}")
    public ResponseEntity updateStatus(@PathVariable long id) {
        try {
            Product product = productService.updateStatus(id);
            return ResponseEntity.ok().body(product);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Error while at updating status");
        }
    }

    @PutMapping("/atualizarProduct/{id}")
    public ResponseEntity updateProduct(@PathVariable Long id, @RequestBody DTOProductRequest productRequest) {
        try {
            Product existingProduct = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            existingProduct.setName(productRequest.name());
            existingProduct.setDescription(productRequest.description());
            existingProduct.setPrice(productRequest.price());
            existingProduct.setStock(productRequest.stock());
            existingProduct.setRating(productRequest.rating());

            productRepository.save(existingProduct);

            return ResponseEntity.ok(existingProduct);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Error updating product: " + ex.getMessage());
        }
    }
    @PostMapping("/teste")
    public ResponseEntity calculatingFrete(@RequestBody FreteRequestDTO freteRequestDTO) {
        double priceFrete = freteService.calculatingFrete(freteRequestDTO.type(), freteRequestDTO.distance());

        return ResponseEntity.ok(priceFrete);
    }

}
