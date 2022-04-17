package ro.ubbcluj.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.ubbcluj.backend.domain.model.CharityOrganization;

@Repository
public interface CharityOrganizationRepository extends JpaRepository<CharityOrganization, Long>  {
}
