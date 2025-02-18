package codksv.apirfds20242.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import codksv.apirfds20242.Entity.TProduct;

@Repository
public interface RepoProduct extends JpaRepository<TProduct, String>  {
    
}
