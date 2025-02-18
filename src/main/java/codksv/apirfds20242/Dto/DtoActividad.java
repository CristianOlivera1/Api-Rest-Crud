package codksv.apirfds20242.Dto;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class DtoActividad {
    private String idActividad;
	private String actividad;
	private String fechaInicio;
	private String fechaFin;
	private boolean estado;
}
