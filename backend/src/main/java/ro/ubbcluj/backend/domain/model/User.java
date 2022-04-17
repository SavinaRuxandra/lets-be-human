package ro.ubbcluj.backend.domain.model;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ro.ubbcluj.backend.domain.UserRole;

import javax.persistence.*;

@Entity
@Table(name = "generic_user")
@Inheritance(strategy = InheritanceType.JOINED)
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@SuperBuilder
public class User extends BaseEntity {
    @Column(unique = true, nullable = false)
    protected String email;
    @Column(nullable = false)
    protected String password;
    @Enumerated(EnumType.ORDINAL)
    protected UserRole role;
}
