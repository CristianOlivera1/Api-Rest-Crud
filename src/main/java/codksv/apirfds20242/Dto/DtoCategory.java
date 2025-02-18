package codksv.apirfds20242.Dto;

import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtoCategory {
    private String idcategory;
	private String name;
	private String description;
	private boolean status;
	private Date createdAt;
	private Date updatedAt;
}