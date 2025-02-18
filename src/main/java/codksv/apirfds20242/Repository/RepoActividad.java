package codksv.apirfds20242.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import codksv.apirfds20242.Entity.TActividad;

@Repository
public interface RepoActividad extends JpaRepository<TActividad, String> {
    List<TActividad> findByEstado(boolean estado);
}
