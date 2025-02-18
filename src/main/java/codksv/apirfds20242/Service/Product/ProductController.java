package codksv.apirfds20242.Service.Product;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import codksv.apirfds20242.Business.BusinessProduct;
import codksv.apirfds20242.Dto.DtoProduct;
import codksv.apirfds20242.Service.Generic.ResponseGeneric;
import codksv.apirfds20242.Service.Product.RequestObject.RequestInsert;
import codksv.apirfds20242.Service.Product.RequestObject.RequestUpdate;
import codksv.apirfds20242.Service.Product.ResponseObject.ResponseDelete;
import codksv.apirfds20242.Service.Product.ResponseObject.ResponseGetAll;
import codksv.apirfds20242.Service.Product.ResponseObject.ResponseInsert;
import codksv.apirfds20242.Service.Product.ResponseObject.ResponseUpdate;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private BusinessProduct businessProduct;

    @PostMapping("/insert")
    public ResponseEntity<ResponseInsert> insert(@Valid @ModelAttribute RequestInsert request, BindingResult bindingResult) {
        ResponseInsert response = new ResponseInsert();

        try {
            if (bindingResult.hasErrors()) {
                bindingResult.getAllErrors().forEach(error -> {
                    response.mo.addResponseMesssage(error.getDefaultMessage());
                });

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            DtoProduct dtoProduct = new DtoProduct();
            dtoProduct.setIdCategory(request.getIdCategory());
            dtoProduct.setName(request.getName());
            dtoProduct.setBarcode(request.getBarcode());
            dtoProduct.setSale_price(request.getSale_price());
            dtoProduct.setStock(request.getStock());
            dtoProduct.setState(request.getState());

            businessProduct.insert(dtoProduct);

            response.mo.addResponseMesssage("Producto registrado correctamente");
            response.mo.setSuccess();
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Ocurrió un error inesperado, estamos trabajando para resolverlo. Gracias por su paciencia.");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{idProduct}")
    public ResponseEntity<ResponseGeneric> getProductById(@PathVariable String idProduct) {
        ResponseGeneric response = new ResponseGeneric();
        try {
            DtoProduct dtoProduct = businessProduct.getProductById(idProduct);
    
            if (dtoProduct == null) {
                response.mo.addResponseMesssage("Producto no encontrado");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
    
            response.mo.setSuccess();
            response.dtoProduct = dtoProduct;
            return new ResponseEntity<>(response, HttpStatus.OK);
    
        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Error al obtener el producto");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

		@GetMapping("/getall")
		public ResponseEntity<ResponseGetAll> getAll() {
			ResponseGetAll responseGetAll = new ResponseGetAll();

			try {
				List<DtoProduct> listDtoProduct = businessProduct.getAll();
				
				for (DtoProduct item : listDtoProduct) {
					Map<String, Object> map = new HashMap<>();
		
					map.put("idProduct", item.getIdProduct());
					map.put("name", item.getName());
					map.put("idCategory", item.getIdCategory());
					map.put("barcode", item.getBarcode());
					map.put("sale_price", item.getSale_price());
					map.put("stock", item.getStock());
					map.put("state", item.getState());
					map.put("createdAt", item.getCreatedAt());
					map.put("updatedAt", item.getUpdatedAt());
		            map.put("categoryName", item.getCategoryName());
					responseGetAll.dto.listProduct.add(map);
					responseGetAll.mo.setSuccess();
				}
			} catch (Exception e) {
				responseGetAll.mo.addResponseMesssage("Ocurrió un error inesperado.");
				responseGetAll.mo.setException();
			}

			return new ResponseEntity<>(responseGetAll, HttpStatus.OK);
		}

		@PutMapping("/update")
		public ResponseEntity<ResponseUpdate> update(@Valid @ModelAttribute RequestUpdate request, BindingResult bindingResult) {
        ResponseUpdate response = new ResponseUpdate();

        try {
            if (bindingResult.hasErrors()) {
                bindingResult.getAllErrors().forEach(error -> {
                    response.mo.addResponseMesssage(error.getDefaultMessage());
                });

                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            DtoProduct dtoProduct = new DtoProduct();
            dtoProduct.setIdProduct(request.getIdProduct());
            dtoProduct.setIdCategory(request.getIdCategory());
            dtoProduct.setName(request.getName());
            dtoProduct.setBarcode(request.getBarcode());
            dtoProduct.setSale_price(request.getSale_price());
            dtoProduct.setStock(request.getStock());
            dtoProduct.setState(request.getState());

            boolean updated = businessProduct.update(dtoProduct);

            if (!updated) {
                response.mo.addResponseMesssage("Producto no encontrado");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            response.mo.addResponseMesssage("Producto actualizado correctamente");
            response.mo.setSuccess();
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Ocurrió un error inesperado, estamos trabajando para resolverlo. Gracias por su paciencia.");
            response.mo.setException();
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{idProduct}")
    public ResponseEntity<ResponseDelete> delete(@PathVariable String idProduct) {
        ResponseDelete response = new ResponseDelete();
        try {
            boolean deleted = businessProduct.delete(idProduct);
            if (!deleted) {
                response.mo.addResponseMesssage("Producto no encontrado");
                response.mo.setError();
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            response.mo.addResponseMesssage("Producto eliminado correctamente");
            response.mo.setSuccess();
        } catch (Exception e) {
            e.printStackTrace();
            response.mo.addResponseMesssage("Ocurrió un error inesperado.");
            response.mo.setException();
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}