package codksv.apirfds20242.Service.Category;

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
import org.springframework.web.bind.annotation.RestController;

import codksv.apirfds20242.Business.BusinessCategory;
import codksv.apirfds20242.Dto.DtoCategory;
import codksv.apirfds20242.Service.Category.RequestObject.RequestInsert;
import codksv.apirfds20242.Service.Category.RequestObject.RequestUpdate;
import codksv.apirfds20242.Service.Category.ResponseObject.ResponseDelete;
import codksv.apirfds20242.Service.Category.ResponseObject.ResponseGetAll;
import codksv.apirfds20242.Service.Category.ResponseObject.ResponseInsert;
import codksv.apirfds20242.Service.Category.ResponseObject.ResponseUpdate;
import codksv.apirfds20242.Service.Generic.ResponseGeneric;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/category")
public class CategoryController {
	@Autowired
	private BusinessCategory businessCategory;

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

			DtoCategory dtoCategory = new DtoCategory();

			dtoCategory.setName(request.getName());
			dtoCategory.setDescription(request.getDescription());
			dtoCategory.setStatus(request.isState());

			businessCategory.insert(dtoCategory);

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
	  @GetMapping("/get/{idCategory}")
    public ResponseEntity<ResponseGeneric> getCategoryById(@PathVariable String idCategory) {
        ResponseGeneric response = new ResponseGeneric();
        try {
            DtoCategory dtoCategory = businessCategory.getCategoryById(idCategory);

            if (dtoCategory == null) {
                response.mo.addResponseMesssage("Categoría no encontrada");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response.mo.setSuccess();
            response.dto = dtoCategory;
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Error al obtener la categoría");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

	@GetMapping(path = "getall")
	public ResponseEntity<ResponseGetAll> getAll() {
		ResponseGetAll responseGetAll = new ResponseGetAll();

		try {
			List<DtoCategory> listDtoCategory = businessCategory.getAll();
			
			for (DtoCategory item : listDtoCategory) {
				Map<String, Object> map = new HashMap<>();
	
				map.put("idcategory", item.getIdcategory());
				map.put("name", item.getName());
				map.put("description", item.getDescription());
				map.put("state", item.isStatus());
				map.put("createdAt", item.getCreatedAt());
				map.put("updatedAt", item.getUpdatedAt());
	
				responseGetAll.dto.listCategory.add(map);
				responseGetAll.mo.setSuccess();
			}
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

			DtoCategory dtoCategory = new DtoCategory();
			dtoCategory.setIdcategory(requestUpdate.getIdCategory());
			dtoCategory.setName(requestUpdate.getName());
			dtoCategory.setDescription(requestUpdate.getDescription());
			dtoCategory.setStatus(requestUpdate.isState());

			boolean updated = businessCategory.update(dtoCategory);

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

	@DeleteMapping(path = "delete/{idCategory}")
	public ResponseEntity<ResponseDelete> delete(@PathVariable String idCategory) {
		ResponseDelete response = new ResponseDelete();
		try {
			boolean delete = businessCategory.delete(idCategory);
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