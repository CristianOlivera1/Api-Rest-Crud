package codksv.apirfds20242.Entity;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tactividad")
@Getter
@Setter
public class TActividad implements Serializable {
        @Id
    @Column(name = "idActividad")
    private String idActividad;

    @Column(name = "actividad")
    private String actividad;
    
    @Column(name = "fechaInicio")
    private String fechaInicio;

    @Column(name = "fechaFin")
    private String fechaFin;

    @Column(name = "estado")
    private boolean estado;
}
