package codksv.apirfds20242.Service.Actividad.RequestObject;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestInsert {
    @NotBlank(message = "El campo \"actividad\" es requerido")
    private String actividad;

    @NotNull(message = "El campo \"fechaInicio\" es requerido")
    private String fechaInicio;

    @NotNull(message = "El campo \"fechaFin\" es requerido")
    private String fechaFin;

    @NotNull(message = "El campo \"estado\" es requerido")
    private boolean estado;

}