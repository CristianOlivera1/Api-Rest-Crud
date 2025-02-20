package codksv.apirfds20242.Business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codksv.apirfds20242.Dto.DtoUser;
import codksv.apirfds20242.Entity.TUser;
import codksv.apirfds20242.Helper.AesUtil;
import codksv.apirfds20242.Repository.RepoUser;
import codksv.apirfds20242.Helper.JwtUtil;

import jakarta.transaction.Transactional;

@Service
public class BusinessUser {
    @Autowired
    private RepoUser repoUser;
    
    @Transactional
    //insertar
	public void insert(DtoUser dtoUser)throws Exception {
        dtoUser.setIdUser(UUID.randomUUID().toString());
        dtoUser.setCreatedAt(new Date());
        dtoUser.setUpdatedAt(new Date());
    
        TUser tUser = new TUser();
        tUser.setIdUser(dtoUser.getIdUser());
        tUser.setNameUser(dtoUser.getNameUser());
		tUser.setPassword(AesUtil.encrypt(dtoUser.getPassword()));
        tUser.setCreatedAt(dtoUser.getCreatedAt());
        tUser.setUpdatedAt(dtoUser.getUpdatedAt());
    
        repoUser.save(tUser);
    }
    
    //esto es para validar el usuario en el formulario de login
    public boolean nameUserExists(String nameUser) {
        return repoUser.findByNameUser(nameUser).isPresent();
    }

    // Cerrar sesión
    public boolean logout(String idUser) {
        Optional<TUser> tUser = repoUser.findById(idUser);

        if (!tUser.isPresent()) {
            return false;
        }

        return true;
    }
    
    public DtoUser login(String nameUser, String password) throws Exception {
        Optional<TUser> tUserOptional = repoUser.findByNameUser(nameUser);

        if (!tUserOptional.isPresent()) {
            return null;
        }

        TUser tUser = tUserOptional.get();
        DtoUser dtoUser = new DtoUser();
        if (!AesUtil.decrypt(tUser.getPassword()).equals(password)) {
            return null;
        }
        dtoUser.setIdUser(tUser.getIdUser());
        dtoUser.setNameUser(tUser.getNameUser());
        dtoUser.setJwtToken(new JwtUtil().generateToken(dtoUser.getIdUser(), dtoUser.getNameUser()));

        return dtoUser; 
    }

    //para mostrar los datos en otra pagina para actualizar 
    public DtoUser getUserById(String idUser) {
        Optional<TUser> tUser = repoUser.findById(idUser);

        if (!tUser.isPresent()) {
            return null;
        }

        TUser User = tUser.get();
        DtoUser dtoUser = new DtoUser();

        dtoUser.setIdUser(User.getIdUser());
        dtoUser.setNameUser(User.getNameUser());
        dtoUser.setPassword(User.getPassword());
        dtoUser.setCreatedAt(User.getCreatedAt());
        dtoUser.setUpdatedAt(User.getUpdatedAt());

        return dtoUser;
    }

    //token
    public DtoUser getByIdUser(String idUser) throws Exception {
		Optional<TUser> tUser = repoUser.findById(idUser);

		DtoUser dtoUser = null;

		if(tUser.isPresent()) {
			dtoUser = new DtoUser();

			dtoUser.setIdUser(tUser.get().getIdUser());
			dtoUser.setNameUser(tUser.get().getNameUser());
			dtoUser.setPassword(tUser.get().getPassword());
			dtoUser.setCreatedAt(tUser.get().getCreatedAt());
			dtoUser.setUpdatedAt(tUser.get().getUpdatedAt());
		}

		return dtoUser;
	}

    //mostrar todos
    public List<DtoUser> getAll() {

        List<TUser> listTUser = repoUser.findAll();
        List<DtoUser> listDtoUser = new ArrayList<>();

        for (TUser item : listTUser) {
            DtoUser dtoUser = new DtoUser();

            dtoUser.setIdUser(item.getIdUser());
            dtoUser.setNameUser(item.getNameUser());
            dtoUser.setPassword(item.getPassword());

            dtoUser.setCreatedAt(item.getCreatedAt());
            dtoUser.setUpdatedAt(item.getUpdatedAt());

            listDtoUser.add(dtoUser);
        }

        return listDtoUser;
    }

    //mostrar actualizar
    @Transactional
    public boolean update(DtoUser dtoUser) throws Exception {

        Optional<TUser> tUsers = repoUser.findById(dtoUser.getIdUser());

        if (!tUsers.isPresent()) {
            return false;
        }

        TUser tUser = tUsers.get();
        tUser.setNameUser(dtoUser.getNameUser());
        tUser.setPassword(AesUtil.encrypt(dtoUser.getPassword()));
        tUser.setUpdatedAt(new Date());

        repoUser.save(tUser);

        return true;
    }

    //eliminar
    @Transactional
    public boolean delete(String idUser) {
        Optional<TUser> tUser = repoUser.findById(idUser);

        if (tUser.isPresent()) {
            repoUser.deleteById(idUser);
            return false;
        }

        return true;
    }

    
    
}