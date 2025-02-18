package codksv.apirfds20242.Service.Client.RequestObject;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestInsert {
    @NotBlank(message = "El campo \"nombre \" es requerido")
    private String firstName ;

    @NotBlank(message = "El campo \"apellido\" es requerido")
    private String surName ;

    @NotBlank(message = "El campo \"dni\" es requerido")
    private String dni ;

    @NotNull(message = "El campo \"state\" es requerido")
    private Boolean gender ;

    @NotNull(message = "El campo \"Celular\" es requerido")
    private Integer phone;

    @NotNull(message = "El campo \"Dirección\" es requerido")
    private String address;

    @NotNull(message = "El campo \"Nacimiento\" es requerido")
    private Date birthDate;

    @NotNull(message = "El campo \"correo\" es requerido")
    private String email;
}
