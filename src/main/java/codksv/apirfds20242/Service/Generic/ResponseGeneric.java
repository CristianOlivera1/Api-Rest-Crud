package codksv.apirfds20242.Service.Generic;

import codksv.apirfds20242.Dto.DtoActividad;
import codksv.apirfds20242.Dto.DtoCategory;
import codksv.apirfds20242.Dto.DtoClient;
import codksv.apirfds20242.Dto.DtoProduct;
import codksv.apirfds20242.Dto.DtoUser;
import codksv.apirfds20242.Dto.MessageObject;

public class ResponseGeneric {
    public DtoCategory dto;
    public MessageObject mo = new MessageObject();
    public DtoClient dtoClient;
    public DtoUser dtoUser;
    public DtoActividad dtoActividad;
    public DtoProduct dtoProduct;
}
