package codksv.apirfds20242.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import codksv.apirfds20242.Entity.TUser;

@Repository
public interface RepoUser extends JpaRepository<TUser, String> {
    //esto es para iniciar sesion el login de usuario

    Optional<TUser> findByNameUserAndPassword(String nameUser, String password);

      //esto es para validar por independiente los datos en el formulario
    Optional<TUser> findByNameUser(String nameUser);

}