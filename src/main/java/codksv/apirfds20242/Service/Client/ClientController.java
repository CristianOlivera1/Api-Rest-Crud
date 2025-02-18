package codksv.apirfds20242.Service.Client;

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

import codksv.apirfds20242.Business.BusinessClient;
import codksv.apirfds20242.Dto.DtoClient;
import codksv.apirfds20242.Service.Client.RequestObject.RequestInsert;
import codksv.apirfds20242.Service.Client.RequestObject.RequestUpdate;
import codksv.apirfds20242.Service.Client.ResponseObject.ResponseDelete;
import codksv.apirfds20242.Service.Client.ResponseObject.ResponseGetAll;
import codksv.apirfds20242.Service.Client.ResponseObject.ResponseInsert;
import codksv.apirfds20242.Service.Client.ResponseObject.ResponseUpdate;
import codksv.apirfds20242.Service.Generic.ResponseGeneric;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/client")
public class ClientController {
    @Autowired
	private BusinessClient businessClient;

	@PostMapping(path = "/insert", consumes = "multipart/form-data")
	public ResponseEntity<ResponseInsert> insert(@Valid @ModelAttribute RequestInsert request,BindingResult bindingResult) {
		ResponseInsert response = new ResponseInsert();

		try {
			if (bindingResult.hasErrors()) {
				bindingResult.getAllErrors().forEach(error -> {
					response.mo.addResponseMesssage(error.getDefaultMessage());
				});

				return new ResponseEntity<>(response, HttpStatus.OK);
			}

			DtoClient dtoClient = new DtoClient();

            dtoClient.setFirstName(request.getFirstName());
            dtoClient.setSurName(request.getSurName());
            dtoClient.setDni(request.getDni());
            dtoClient.setGender(request.getGender());
            dtoClient.setPhone(request.getPhone());
            dtoClient.setAddress(request.getAddress());
            dtoClient.setBirthDate(request.getBirthDate());
            dtoClient.setEmail(request.getEmail());

			businessClient.insert(dtoClient);

			response.mo.addResponseMesssage("Registro realizado correctamente");
			response.mo.setSuccess();
		} catch (Exception e) {
			response.mo.addResponseMesssage(
					"Ocurrió un error inesperado, estamos trabajando para resolvero. Gracias por su paciencia.");
			response.mo.setException();
		}

		return new ResponseEntity<>(response, HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<ResponseGeneric> login(@RequestParam String email, @RequestParam String dni) {
		ResponseGeneric response = new ResponseGeneric();
		try {
			DtoClient dtoClient = businessClient.login(email, dni);

			if (dtoClient == null) {
				if (!businessClient.emailExists(email)) {
					response.mo.addResponseMesssage("Email incorrecto");
				} else {
					response.mo.addResponseMesssage("Contraseña incorrecta");
				}
				response.mo.setError();
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
			
			response.mo.addResponseMesssage("Inicio de sesion realizado correctamente");
			response.mo.setSuccess();
			response.dtoClient = dtoClient;
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			response.mo.addResponseMesssage("Error al iniciar sesión");
			response.mo.setException();
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//mostrar los datos al ir de una ventana a otra en el frontend
	  @GetMapping("/get/{idClient}")
    public ResponseEntity<ResponseGeneric> getClientById(@PathVariable String idClient) {
        ResponseGeneric response = new ResponseGeneric();
        try {
            DtoClient dtoClient = businessClient.getClientById(idClient);

            if (dtoClient == null) {
                response.mo.addResponseMesssage("Cliente no encontrado");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response.mo.setSuccess();
            response.dtoClient = dtoClient;
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Error al obtener el Cliente");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@GetMapping(path = "/getall")
	public ResponseEntity<ResponseGetAll> getAll() {
		ResponseGetAll responseGetAll = new ResponseGetAll();

		try {
			List<DtoClient> listDtoClient = businessClient.getAll();
			
			for (DtoClient item : listDtoClient) {
				Map<String, Object> map = new HashMap<>();
	
                map.put("idClient", item.getIdClient());
                map.put("firstName", item.getFirstName());
                map.put("surName", item.getSurName());
                map.put("dni", item.getDni());
                map.put("gender", item.getGender());
                map.put("phone", item.getPhone());
                map.put("address", item.getAddress());
                map.put("birthDate", item.getBirthDate());
                map.put("email", item.getEmail());
                map.put("createdAt", item.getCreatedAt());
                map.put("updatedAt", item.getUpdatedAt());
	
				responseGetAll.dto.listClient.add(map);
				responseGetAll.mo.setSuccess();
			}
		} catch (Exception e) {
			responseGetAll.mo.addResponseMesssage("Ocurrió un error inesperado.");
			responseGetAll.mo.setException();
		}

		return new ResponseEntity<>(responseGetAll, HttpStatus.OK);
	}

	@PutMapping(path = "/update", consumes = { "multipart/form-data" })
	public ResponseEntity<ResponseUpdate> actionUpdate(@ModelAttribute RequestUpdate requestUpdate) {

		ResponseUpdate responseUpdate = new ResponseUpdate();

		try {

			DtoClient dtoClient = new DtoClient();
            
            dtoClient.setIdClient(requestUpdate.getIdClient());
            dtoClient.setFirstName(requestUpdate.getFirstName());
            dtoClient.setSurName(requestUpdate.getSurName());
            dtoClient.setDni(requestUpdate.getDni());
            dtoClient.setGender(requestUpdate.getGender());
            dtoClient.setPhone(requestUpdate.getPhone());
            dtoClient.setAddress(requestUpdate.getAddress());
            dtoClient.setBirthDate(requestUpdate.getBirthDate());
            dtoClient.setEmail(requestUpdate.getEmail());

			boolean updated = businessClient.update(dtoClient);

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

	@DeleteMapping(path = "/delete/{idClient}")
	public ResponseEntity<ResponseDelete> delete(@PathVariable String idClient) {
		ResponseDelete response = new ResponseDelete();
		try {
			boolean delete = businessClient.delete(idClient);
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
