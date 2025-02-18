package codksv.apirfds20242.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import codksv.apirfds20242.Entity.TCategory;

@Repository
public interface RepoCategory extends JpaRepository<TCategory, String> {

    Optional<TCategory> findByName(String name);
}