package com.pi.yamam.infra.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.springframework.web.multipart.MultipartFile;

public class UploadUtil {
    public static boolean updloadImage(MultipartFile image) {
        boolean isUpload = false;
        if (!image.isEmpty()) {
            String nameArchive = image.getOriginalFilename();
            try {
                String folderUploadImage = "src/main/resources/static/images";
                File dir = new File(folderUploadImage);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                File serverFile = new File(dir.getAbsolutePath() + File.separator + nameArchive);

                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(image.getBytes());
                System.out.println("Imagem armazenada");
                System.out.println(serverFile.getAbsolutePath());

            } catch (Exception ex) {
                System.out.println("Falha ao carregar os arquivos" + ex.getMessage());
            }
        }
        else{
            System.out.println("Arquivo vazio");

        }
        return isUpload;

    }
}
