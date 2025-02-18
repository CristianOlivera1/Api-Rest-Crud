package codksv.apirfds20242.Dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoUser {
	private String idUser;
	private String nameUser;
	private String password;
	private Date createdAt;
	private Date updatedAt;
	private String jwtToken;
		
}