package codksv.apirfds20242.Service.Client.RequestObject;

import java.sql.Date;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUpdate {
    private String idClient;
    @NotBlank(message = "El campo \"firstName\" es requerido")
    private String firstName;

    @NotBlank(message = "El campo \"surName\" es requerido")
    private String surName;

    @NotBlank(message = "El campo \"dni\" es requerido")
    private String dni;

    @NotNull(message = "El campo \"gender\" es requerido")
    private Boolean gender;

    @NotNull(message = "El campo \"phone\" es requerido")
    private int phone;

    @NotBlank(message = "El campo \"address\" es requerido")
    private String address;

    @NotNull(message = "El campo \"birthDate\" es requerido")
    private Date birthDate;

    @NotBlank(message = "El campo \"email\" es requerido")
    private String email;
}
