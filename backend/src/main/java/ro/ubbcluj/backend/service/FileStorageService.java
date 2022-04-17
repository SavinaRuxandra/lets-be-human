package ro.ubbcluj.backend.service;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ro.ubbcluj.backend.exception.FileStorageException;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;

@Service
public class FileStorageService {

    public void uploadFile(MultipartFile file, String path) {
        Path uploadPath = Paths.get(path);
        try {
            if (!Files.exists(uploadPath))
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
            throw new FileStorageException(path);
        }

        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadPath.resolve(path);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new FileStorageException(path);
        }
    }

    public byte[] getFileAsByteArray(String path) {
        try {
            File file = new File(path);
            return FileUtils.readFileToByteArray(file);
        } catch (IOException e) {
            throw new FileStorageException(path);
        }
    }
}
