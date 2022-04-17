package ro.ubbcluj.backend.domain.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class Donor extends User {
    private String firstName;
    private String lastName;
}
