package ro.ubbcluj.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ClientDto implements Serializable {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
}
