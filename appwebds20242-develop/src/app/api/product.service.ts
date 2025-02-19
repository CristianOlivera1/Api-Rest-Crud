import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://peaceful-expression-production.up.railway.app';
  constructor(private httpClient: HttpClient) { }

  insert(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/product/insert`, formData);
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/product/getall`);
  }

  public delete(idproduct: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/product/delete/${idproduct}`);
  }

  //actualizar
  public update(idproduct: string, formData: FormData): Observable<any> {
    formData.append('idProduct', idproduct); 
    return this.httpClient.put(`${this.apiUrl}/product/update`, formData);
  }
  

  // reenviar a otra pagina para actualizar en el frontend
  getProductById(productId: string): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/product/get/${productId}`);
  }
  
  public getCategories(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/category/getall`);
	}
}
