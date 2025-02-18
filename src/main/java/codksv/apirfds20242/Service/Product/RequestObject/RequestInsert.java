package codksv.apirfds20242.Service.Product.RequestObject;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class RequestInsert {
    @NotNull(message = "El campo \"idCategory\" es requerido")
    private String idCategory;
    
    @NotBlank(message = "El campo \"name\" es requerido")
    private String name;
    
    @NotBlank(message = "El campo \"barcode\" es requerido")
    private String barcode;
    
    @NotNull(message = "El campo \"sale_price\" es requerido")
    private Float sale_price;
    
    @NotNull(message = "El campo \"stock\" es requerido")
    private Integer stock;
    
    @NotNull(message = "El campo \"state\" es requerido")
    private Boolean state;
}
