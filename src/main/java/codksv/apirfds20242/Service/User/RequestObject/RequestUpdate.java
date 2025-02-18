package codksv.apirfds20242.Service.User.RequestObject;


import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestUpdate {

    private String idUser;
    @NotBlank(message = "El campo \"usuario\" es requerido")
    private String nameUser;

    @NotBlank(message = "El campo \"contraseña\" es requerido")
    private String password;
}
