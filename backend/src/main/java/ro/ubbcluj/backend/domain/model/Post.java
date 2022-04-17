package ro.ubbcluj.backend.domain.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class Post extends BaseEntity {
    @ManyToOne
    private CharityOrganization charityOrganization;
    private String headline;
    private String description;
    private String readMoreUrl;
    @ElementCollection(targetClass=String.class)
    private List<String> photos;
}
