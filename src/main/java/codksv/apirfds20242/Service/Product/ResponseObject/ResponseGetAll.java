package codksv.apirfds20242.Service.Product.ResponseObject;

import java.util.ArrayList;
import java.util.List;

import codksv.apirfds20242.Service.Generic.ResponseGeneric;

public class ResponseGetAll extends ResponseGeneric {
    	public class Response {
		public List<Object> listProduct = new ArrayList<>();
	}

	public Response dto = new Response();
}