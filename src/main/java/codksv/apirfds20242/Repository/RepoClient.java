package codksv.apirfds20242.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import codksv.apirfds20242.Entity.TClient;

@Repository
public interface RepoClient extends JpaRepository<TClient, String> {
    Optional<TClient> findByEmailAndDni(String email, String dni);
    Optional<TClient> findByEmail(String email);

}