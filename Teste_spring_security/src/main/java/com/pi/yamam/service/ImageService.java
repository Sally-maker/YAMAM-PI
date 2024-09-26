package com.pi.yamam.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pi.yamam.domain.images.Images;
import com.pi.yamam.domain.images.DTO.ImageRequestDTO;
import com.pi.yamam.domain.product.Product;
import com.pi.yamam.infra.util.UploadUtil;
import com.pi.yamam.repositories.ImageRepository;
import com.pi.yamam.repositories.ProductRepository;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    public boolean insertImage(MultipartFile file, ImageRequestDTO imageRequestDTO) {

        Images newImage = new Images(null, imageRequestDTO.pathImage(), imageRequestDTO.isMain(),
                imageRequestDTO.product());
        boolean saveImage = UploadUtil.updloadImage(file);
        Images image = imageRepository.save(newImage);
        

        return true;
    }

    public void uploadImages(List<MultipartFile> files, Long teste) {
        int index = 1;
        Product product = productRepository.findById(teste).orElseThrow(() -> new RuntimeException("Erro"));
        boolean isUpload;
        for (MultipartFile file : files) {
            if (index == 1) {
                isUpload = insertImage(file, new ImageRequestDTO(file.getOriginalFilename(), true, product));
            }
            isUpload = insertImage(file, new ImageRequestDTO(file.getOriginalFilename(), false, product));
            if (isUpload == false) {
                break;
            }
            index++;

        }
    }

}
