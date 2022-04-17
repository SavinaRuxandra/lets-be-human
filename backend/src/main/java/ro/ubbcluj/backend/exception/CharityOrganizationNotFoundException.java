package ro.ubbcluj.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CharityOrganizationNotFoundException extends RuntimeException {
    public CharityOrganizationNotFoundException(Long id) {
        super(String.format("Charity organization with id %d doesn't exist in the database", id));
    }
}
