package ro.ubbcluj.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ro.ubbcluj.backend.model.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
}
