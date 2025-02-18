package codksv.apirfds20242.Business;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codksv.apirfds20242.Dto.DtoClient;
import codksv.apirfds20242.Entity.TClient;
import codksv.apirfds20242.Repository.RepoClient;

import jakarta.transaction.Transactional;

@Service
public class BusinessClient {
    @Autowired
    private RepoClient repoClient;
    
    @Transactional
    //insertar
	public void insert(DtoClient dtoClient) {
		dtoClient.setIdClient(UUID.randomUUID().toString());
        dtoClient.setCreatedAt(new Date());
        dtoClient.setUpdatedAt(new Date());

		TClient tClient = new TClient();

        tClient.setIdClient(dtoClient.getIdClient());
        tClient.setFirstName(dtoClient.getFirstName());
        tClient.setSurName(dtoClient.getSurName());
        tClient.setDni(dtoClient.getDni());
        tClient.setGender(dtoClient.getGender());
        tClient.setPhone(dtoClient.getPhone());
        tClient.setAddress(dtoClient.getAddress());
        tClient.setBirthDate(dtoClient.getBirthDate());
        tClient.setEmail(dtoClient.getEmail());
        tClient.setCreatedAt(dtoClient.getCreatedAt());
        tClient.setUpdatedAt(dtoClient.getUpdatedAt());

		repoClient.save(tClient);
	}

    public boolean emailExists(String email) {
        return repoClient.findByEmail(email).isPresent();
    }
    
    public DtoClient login(String email, String dni) {
        Optional<TClient> tClientOptional = repoClient.findByEmailAndDni(email, dni);

        if (!tClientOptional.isPresent()) {
            return null;
        }

        TClient tClient = tClientOptional.get();
        DtoClient dtoClient = new DtoClient();
        dtoClient.setIdClient(tClient.getIdClient());
        dtoClient.setFirstName(tClient.getFirstName());
        dtoClient.setSurName(tClient.getSurName());
        dtoClient.setDni(tClient.getDni());
        dtoClient.setGender(tClient.getGender());
        dtoClient.setPhone(tClient.getPhone());
        dtoClient.setAddress(tClient.getAddress());
        dtoClient.setBirthDate(tClient.getBirthDate());
        dtoClient.setEmail(tClient.getEmail());
        dtoClient.setCreatedAt(tClient.getCreatedAt());
        dtoClient.setUpdatedAt(tClient.getUpdatedAt());

        return dtoClient;
    }


    //para mostrar los datos en otra pagina para actualizar 
    public DtoClient getClientById(String idClient) {
        Optional<TClient> tClient = repoClient.findById(idClient);

        if (!tClient.isPresent()) {
            return null;
        }

        TClient Client = tClient.get();
        DtoClient dtoClient = new DtoClient();

        dtoClient.setIdClient(Client.getIdClient());
        dtoClient.setFirstName(Client.getFirstName());
        dtoClient.setSurName(Client.getSurName());
        dtoClient.setDni(Client.getDni());
        dtoClient.setGender(Client.getGender());
        dtoClient.setPhone(Client.getPhone());
        dtoClient.setAddress(Client.getAddress());
        dtoClient.setBirthDate(Client.getBirthDate());
        dtoClient.setEmail(Client.getEmail());
        dtoClient.setCreatedAt(Client.getCreatedAt());
        dtoClient.setUpdatedAt(Client.getUpdatedAt());

        return dtoClient;
    }

    //mostrar todos
    public List<DtoClient> getAll() {

        List<TClient> listTClient = repoClient.findAll();
        List<DtoClient> listDtoClient = new ArrayList<>();

        for (TClient item : listTClient) {
            DtoClient dtoClient = new DtoClient();

            dtoClient.setIdClient(item.getIdClient());
            dtoClient.setFirstName(item.getFirstName());
            dtoClient.setSurName(item.getSurName());
            dtoClient.setDni(item.getDni());
            dtoClient.setGender(item.getGender());
            dtoClient.setPhone(item.getPhone());
            dtoClient.setAddress(item.getAddress());
            dtoClient.setBirthDate(item.getBirthDate());
            dtoClient.setEmail(item.getEmail());
            dtoClient.setCreatedAt(item.getCreatedAt());
            dtoClient.setUpdatedAt(item.getUpdatedAt());

            listDtoClient.add(dtoClient);
        }

        return listDtoClient;
    }

    //mostrar actualizar
    @Transactional
    public boolean update(DtoClient dtoClient) {

        Optional<TClient> tClients = repoClient.findById(dtoClient.getIdClient());

        if (!tClients.isPresent()) {
            return false;
        }

        TClient tClient = tClients.get();
        tClient.setFirstName(dtoClient.getFirstName());
        tClient.setSurName(dtoClient.getSurName());
        tClient.setDni(dtoClient.getDni());
        tClient.setGender(dtoClient.getGender());
        tClient.setPhone(dtoClient.getPhone());
        tClient.setAddress(dtoClient.getAddress());
        tClient.setBirthDate(dtoClient.getBirthDate());
        tClient.setEmail(dtoClient.getEmail());
        tClient.setUpdatedAt(new Date());

        repoClient.save(tClient);

        return true;
    }

    //eliminar
    @Transactional
    public boolean delete(String idClient) {
        Optional<TClient> tClient = repoClient.findById(idClient);

        if (tClient.isPresent()) {
            repoClient.deleteById(idClient);
            return false;
        }

        return true;
    }
}