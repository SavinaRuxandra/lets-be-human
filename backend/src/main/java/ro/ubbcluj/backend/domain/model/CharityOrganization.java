package ro.ubbcluj.backend.domain.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class CharityOrganization extends User {
    @Column(name = "organization_name", unique = true)
    private String name;
    private String description;
    private String phoneNumber;
    @Column(nullable = false)
    private String accountAddress;
}
