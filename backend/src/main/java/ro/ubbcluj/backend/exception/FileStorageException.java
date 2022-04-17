package ro.ubbcluj.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class FileStorageException extends RuntimeException {
    public FileStorageException(String path) {
        super(String.format("Photo could not be saved to the path %s", path));
    }

    public FileStorageException(Throwable cause) {
        super(cause);
    }
}
