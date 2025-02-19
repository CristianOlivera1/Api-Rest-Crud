import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PlatziService {
    constructor(private httpClient: HttpClient) { }
    //mostrar datos
    public getData(): Observable<any> {
        return this.httpClient.get('https://api.escuelajs.co/api/v1/products').pipe(retry(3));
    }

    //insertar datos
    public postData(product: any): Observable<any> {
        return this.httpClient.post('https://api.escuelajs.co/api/v1/products', product);
    }

    //eliminar datos
    public deleteData(id: number): Observable<any> {
        return this.httpClient.delete(`https://api.escuelajs.co/api/v1/products/${id}`);
    }
    
    public updateData(id: number, product: any): Observable<any> {
        return this.httpClient.put(`https://api.escuelajs.co/api/v1/products/${id}`, product);
    }
}
