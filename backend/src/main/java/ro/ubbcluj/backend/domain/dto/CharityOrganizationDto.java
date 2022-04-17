package ro.ubbcluj.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class CharityOrganizationDto implements Serializable {
    private Long id;
    private String email;
    private String password;
    private String name;
    private String description;
    private String phoneNumber;
    private String accountAddress;
}
