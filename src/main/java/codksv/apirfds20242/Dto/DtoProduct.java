package codksv.apirfds20242.Dto;
import java.time.LocalDateTime;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class DtoProduct {
    private String idProduct; 
    private String name;
    private String idCategory;
    private String barcode;
    private Float sale_price;
    private Integer stock;
    private Boolean state;
	private Date createdAt;
	private Date updatedAt;
    private String categoryName;
}
