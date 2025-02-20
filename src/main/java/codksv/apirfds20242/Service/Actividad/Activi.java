package codksv.apirfds20242.Service.Actividad;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codksv.apirfds20242.Business.BusinessActividad;
import codksv.apirfds20242.Dto.DtoActividad;
import codksv.apirfds20242.Service.Actividad.RequestObject.RequestInsert;
import codksv.apirfds20242.Service.Actividad.RequestObject.RequestUpdate;
import codksv.apirfds20242.Service.Actividad.ResponseObject.ResponseDelete;
import codksv.apirfds20242.Service.Actividad.ResponseObject.ResponseGetAll;
import codksv.apirfds20242.Service.Actividad.ResponseObject.ResponseInsert;
import codksv.apirfds20242.Service.Actividad.ResponseObject.ResponseUpdate;
import codksv.apirfds20242.Service.Generic.ResponseGeneric;
import jakarta.validation.Valid;

@RestController

@RequestMapping("/actividad")
public class Activi {
	@Autowired
	private BusinessActividad businessActividad;

	@PostMapping(path = "insert", consumes = "multipart/form-data")
	public ResponseEntity<ResponseInsert> insert(@Valid @ModelAttribute RequestInsert request,
		BindingResult bindingResult) {
		ResponseInsert response = new ResponseInsert();

		try {
			if (bindingResult.hasErrors()) {
				bindingResult.getAllErrors().forEach(error -> {
					response.mo.addResponseMesssage(error.getDefaultMessage());
				});

				return new ResponseEntity<>(response, HttpStatus.OK);
			}

			DtoActividad dtoActividad = new DtoActividad();
			dtoActividad.setActividad(request.getActividad());
			dtoActividad.setFechaInicio(request.getFechaInicio());
			dtoActividad.setFechaFin(request.getFechaFin());
			dtoActividad.setEstado(request.isEstado());

			businessActividad.insert(dtoActividad);

			response.mo.addResponseMesssage("Registro realizado correctamente");
			response.mo.setSuccess();
		} catch (Exception e) {
			response.mo.addResponseMesssage(
					"Ocurrió un error inesperado, estamos trabajando para resolvero. Gracias por su paciencia.");
			response.mo.setException();
		}

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	//mostrar los datos al ir de una ventana a otra en el frontend
	  @GetMapping("/get/{idActividad}")
    public ResponseEntity<ResponseGeneric> getActividadById(@PathVariable String idActividad) {
        ResponseGeneric response = new ResponseGeneric();
        try {
            DtoActividad dtoActividad = businessActividad.getActividadById(idActividad);

            if (dtoActividad == null) {
                response.mo.addResponseMesssage("Categoría no encontrada");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response.mo.setSuccess();
            response.dtoActividad = dtoActividad;
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Error al obtener la categoría");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@GetMapping("/estado/{estado}")
	public ResponseEntity<ResponseGetAll> getActividadesByEstado(@PathVariable boolean estado) {
		ResponseGetAll responseGetAll = new ResponseGetAll();

		try {
			List<DtoActividad> listDtoActividad = businessActividad.getActividadesByEstado(estado);

			for (DtoActividad item : listDtoActividad) {
				Map<String, Object> map = new HashMap<>();

				map.put("idActividad", item.getIdActividad());
				map.put("actividad", item.getActividad());
				map.put("fechaInicio", item.getFechaInicio());
				map.put("fechaFin", item.getFechaFin());
				map.put("estado", item.isEstado());

				responseGetAll.dto.listActividad.add(map);
			}
			responseGetAll.mo.setSuccess();
		} catch (Exception e) {
			responseGetAll.mo.addResponseMesssage("Ocurrió un error inesperado.");
			responseGetAll.mo.setException();
		}

		return new ResponseEntity<>(responseGetAll, HttpStatus.OK);
	}

	@GetMapping(path = "getall")
public ResponseEntity<ResponseGetAll> getAll(@RequestParam int page, @RequestParam int size) {
    ResponseGetAll responseGetAll = new ResponseGetAll();

    try {
        List<DtoActividad> listDtoActividad = businessActividad.getAll(page, size);
        int totalRecords = businessActividad.countAll();

        for (DtoActividad item : listDtoActividad) {
            Map<String, Object> map = new HashMap<>();

            map.put("idActividad", item.getIdActividad());
            map.put("actividad", item.getActividad());
            map.put("fechaInicio", item.getFechaInicio());
            map.put("fechaFin", item.getFechaFin());
            map.put("estado", item.isEstado());

            responseGetAll.dto.listActividad.add(map);
        }

        responseGetAll.mo.setSuccess();
        responseGetAll.totalPages = (int) Math.ceil((double) totalRecords / size);
    } catch (Exception e) {
        responseGetAll.mo.addResponseMesssage("Ocurrió un error inesperado.");
        responseGetAll.mo.setException();
    }

    return new ResponseEntity<>(responseGetAll, HttpStatus.OK);
}

	@PutMapping(path = "update", consumes = { "multipart/form-data" })
	public ResponseEntity<ResponseUpdate> actionUpdate(@ModelAttribute RequestUpdate requestUpdate) {

		ResponseUpdate responseUpdate = new ResponseUpdate();

		try {

			DtoActividad dtoActividad = new DtoActividad();
			dtoActividad.setIdActividad(requestUpdate.getIdActividad());
			dtoActividad.setActividad(requestUpdate.getActividad());
			dtoActividad.setFechaInicio(requestUpdate.getFechaInicio());
			dtoActividad.setFechaFin(requestUpdate.getFechaFin());
			dtoActividad.setEstado(requestUpdate.isEstado());

			boolean updated = businessActividad.update(dtoActividad);

			if (!updated) {
				responseUpdate.mo.addResponseMesssage("No se encontró el registro para actualizar.");
				return new ResponseEntity<>(responseUpdate, HttpStatus.NOT_FOUND);
			}

			responseUpdate.mo.setSuccess();
			responseUpdate.mo.addResponseMesssage("El registro se actualizo correctamente.");
			return new ResponseEntity<>(responseUpdate, HttpStatus.OK);

		} catch (Exception e) {
			responseUpdate.mo.setException();
			responseUpdate.mo.addResponseMesssage("Ocurrió un error inesperado, estamos trabajando para solucionarlo.");

			return new ResponseEntity<>(responseUpdate, HttpStatus.BAD_REQUEST);
		}
	}

	@DeleteMapping(path = "delete/{idActividad}")
	public ResponseEntity<ResponseDelete> delete(@PathVariable String idActividad) {
		ResponseDelete response = new ResponseDelete();
		try {
			boolean delete = businessActividad.delete(idActividad);
			if (delete) {
				response.mo.addResponseMesssage("No se encontró el registro para eliminar.");
				return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
			}
			response.mo.addResponseMesssage("Eliminación realizada correctamente");
			response.mo.setSuccess();
		} catch (Exception e) {
			response.mo.addResponseMesssage("Ocurrió un error inesperado.");
			response.mo.setException();
		}
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}