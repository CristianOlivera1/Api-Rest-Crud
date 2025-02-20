package codksv.apirfds20242.Service.User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import codksv.apirfds20242.Business.BusinessUser;
import codksv.apirfds20242.Dto.DtoUser;
import codksv.apirfds20242.Service.User.RequestObject.RequestUpdate;
import codksv.apirfds20242.Service.User.ResponseObject.ResponseDelete;
import codksv.apirfds20242.Service.User.ResponseObject.ResponseGetAll;
import codksv.apirfds20242.Service.User.ResponseObject.ResponseUpdate;
import codksv.apirfds20242.Service.Generic.ResponseGeneric;

@RestController

@RequestMapping("/user")
public class UserController {
    @Autowired
	private BusinessUser businessUser;

     @PostMapping("/insert")
    public ResponseEntity<ResponseGeneric> insert(@RequestParam String nameUser, @RequestParam String password) {
        ResponseGeneric response = new ResponseGeneric();
        try {
            if (businessUser.nameUserExists(nameUser)) {
                response.mo.addResponseMesssage("El nombre de usuario ya existe");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            DtoUser dtoUser = new DtoUser();
            dtoUser.setNameUser(nameUser);
            dtoUser.setPassword(password);

            businessUser.insert(dtoUser);

            response.mo.addResponseMesssage("Registro realizado correctamente");
            response.mo.setSuccess();
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Ocurrió un error inesperado, estamos trabajando para resolverlo. Gracias por su paciencia.");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@PostMapping("/login")
	public ResponseEntity<ResponseGeneric> login(@RequestParam String nameUser, @RequestParam String password) {
		ResponseGeneric response = new ResponseGeneric();
		try {
			DtoUser dtoUser = businessUser.login(nameUser, password);

			if (dtoUser == null) {
				if (!businessUser.nameUserExists(nameUser)) {
					response.mo.addResponseMesssage("usuario incorrecto");
				} else {
					response.mo.addResponseMesssage("Contraseña incorrecta");
				}
				response.mo.setError();
				return new ResponseEntity<>(response, HttpStatus.OK);
			}
			dtoUser.setIdUser(dtoUser.getIdUser());
			dtoUser.setJwtToken(dtoUser.getJwtToken());


			response.mo.addResponseMesssage("Inicio de sesion realizado correctamente");
			response.mo.setSuccess();
			response.dtoUser = dtoUser;
			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			response.mo.addResponseMesssage("Error al iniciar sesión");
			response.mo.setException();
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}	

	@PostMapping("/logout")
	public ResponseEntity<ResponseGeneric> logout(@RequestParam String idUser) {
		ResponseGeneric response = new ResponseGeneric();
		try {
			// Permitir logout incluso si el usuario ya eliminó su sesión
			boolean loggedOut = businessUser.logout(idUser);
	
			response.mo.addResponseMesssage("Cierre de sesión realizado correctamente");
			response.mo.setSuccess();
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			response.mo.addResponseMesssage("Error al cerrar sesión");
			response.mo.setException();
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

	//mostrar los datos al ir de una ventana a otra en el frontend
	  @GetMapping("/get/{idUser}")
    public ResponseEntity<ResponseGeneric> getUserById(@PathVariable String idUser) {
        ResponseGeneric response = new ResponseGeneric();
        try {
            DtoUser dtoUser = businessUser.getUserById(idUser);

            if (dtoUser == null) {
                response.mo.addResponseMesssage("Usuario no encontrado");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response.mo.setSuccess();
            response.dtoUser = dtoUser;
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Error al obtener el Usuario");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@GetMapping(path = "/getall")
	public ResponseEntity<ResponseGetAll> getAll() {
		ResponseGetAll responseGetAll = new ResponseGetAll();

		try {
			List<DtoUser> listDtoUser = businessUser.getAll();
			
			for (DtoUser item : listDtoUser) {
				Map<String, Object> map = new HashMap<>();
	
                map.put("idUser", item.getIdUser());
                map.put("nameUser", item.getNameUser());
                map.put("password", item.getPassword());
                map.put("createdAt", item.getCreatedAt());
                map.put("updatedAt", item.getUpdatedAt());
				map.put("jwtToken", item.getJwtToken());
	
				responseGetAll.dto.listUser.add(map);
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

			DtoUser dtoUser = new DtoUser();
            
            dtoUser.setIdUser(requestUpdate.getIdUser());
            dtoUser.setNameUser(requestUpdate.getNameUser());
            dtoUser.setPassword(requestUpdate.getPassword());
			boolean updated = businessUser.update(dtoUser);

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

	@DeleteMapping(path = "/delete/{idUser}")
	public ResponseEntity<ResponseDelete> delete(@PathVariable String idUser) {
		ResponseDelete response = new ResponseDelete();
		try {
			boolean delete = businessUser.delete(idUser);
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
