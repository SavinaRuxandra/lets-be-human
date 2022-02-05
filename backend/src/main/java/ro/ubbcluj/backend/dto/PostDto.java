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
public class PostDto implements Serializable {
    private Long id;
    private Long clientId;
    private String description;
    private String post;
}
