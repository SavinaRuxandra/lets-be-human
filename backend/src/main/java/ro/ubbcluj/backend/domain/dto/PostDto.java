package ro.ubbcluj.backend.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PostDto implements Serializable {
    private Long id;
    private Long charityOrganizationId;
    private String headline;
    private String description;
    private String readMoreUrl;
    private List<byte[]> photos;
}
