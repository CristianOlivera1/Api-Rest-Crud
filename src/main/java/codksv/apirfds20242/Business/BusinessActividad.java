package codksv.apirfds20242.Business;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import codksv.apirfds20242.Dto.DtoActividad;
import codksv.apirfds20242.Entity.TActividad;
import codksv.apirfds20242.Repository.RepoActividad;
import jakarta.transaction.Transactional;

@Service
public class BusinessActividad {
    @Autowired
    private RepoActividad repoActividad;
    
    @Transactional
	public void insert(DtoActividad dtoActividad) {
        dtoActividad.setIdActividad(UUID.randomUUID().toString());

        TActividad tActividad = new TActividad();

        // Additional fields
        tActividad.setIdActividad(dtoActividad.getIdActividad());
        tActividad.setActividad(dtoActividad.getActividad());
        tActividad.setFechaInicio(dtoActividad.getFechaInicio());

        tActividad.setFechaFin(dtoActividad.getFechaFin());
        tActividad.setEstado(dtoActividad.isEstado());

		repoActividad.save(tActividad);
	}

    public DtoActividad getActividadById(String idActividad) {
        Optional<TActividad> tActividad = repoActividad.findById(idActividad);

        if (!tActividad.isPresent()) {
            return null;
        }

        TActividad actividad = tActividad.get();
        DtoActividad dtoActividad = new DtoActividad();

        dtoActividad.setIdActividad(actividad.getIdActividad());
        dtoActividad.setActividad(actividad.getActividad());
        dtoActividad.setFechaInicio(actividad.getFechaInicio());
        dtoActividad.setFechaFin(actividad.getFechaFin());
        dtoActividad.setEstado(actividad.isEstado());

        return dtoActividad;
    }

    //actividad por estad
    public List<DtoActividad> getActividadesByEstado(boolean estado) {
        List<TActividad> listTActividad = repoActividad.findByEstado(estado);
        List<DtoActividad> listDtoActividad = new ArrayList<>();

        for (TActividad item : listTActividad) {
            DtoActividad dtoActividad = new DtoActividad();

            dtoActividad.setIdActividad(item.getIdActividad());
            dtoActividad.setActividad(item.getActividad());
            dtoActividad.setFechaInicio(item.getFechaInicio());
            dtoActividad.setFechaFin(item.getFechaFin());
            dtoActividad.setEstado(item.isEstado());

            listDtoActividad.add(dtoActividad);
        }

        return listDtoActividad;
    }

    public List<DtoActividad> getAll() {

        List<TActividad> listTActividad = repoActividad.findAll();
        List<DtoActividad> listDtoActividad = new ArrayList<>();

        for (TActividad item : listTActividad) {
            DtoActividad dtoActividad = new DtoActividad();

            dtoActividad.setIdActividad(item.getIdActividad());
            dtoActividad.setActividad(item.getActividad());
            dtoActividad.setFechaInicio(item.getFechaInicio());

            dtoActividad.setFechaFin(item.getFechaFin());
            dtoActividad.setEstado(item.isEstado());

            listDtoActividad.add(dtoActividad);
        }

        return listDtoActividad;
    }

    @Transactional
    public boolean update(DtoActividad dtoActividad) {

        Optional<TActividad> tActividads = repoActividad.findById(dtoActividad.getIdActividad());

        if (!tActividads.isPresent()) {
            return false;
        }

        TActividad tActividad = tActividads.get();
        tActividad.setActividad(dtoActividad.getActividad());
        tActividad.setFechaInicio(dtoActividad.getFechaInicio());
        tActividad.setFechaFin(dtoActividad.getFechaFin());
        tActividad.setEstado(dtoActividad.isEstado());
        repoActividad.save(tActividad);

        return true;
    }

    @Transactional
    public boolean delete(String idActividad) {
        Optional<TActividad> tActividad = repoActividad.findById(idActividad);

        if (tActividad.isPresent()) {
            repoActividad.deleteById(idActividad);
            return false;
        }

        return true;
    }
}
