package ro.ubbcluj.backend.domain.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class Post extends BaseEntity {
    private String charityOrganizationAddress;
    private String headline;
    @Column(length=10000)
    private String description;
    private String readMoreUrl;
    @ElementCollection(targetClass=String.class)
    private List<String> photos;
}
