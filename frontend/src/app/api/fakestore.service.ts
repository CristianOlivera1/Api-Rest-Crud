import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FakeStoreService {

    private baseUrl: string = 'https://fakestoreapi.com';

    constructor(private httpClient: HttpClient) {}
  
    getCategories(): Observable<string[]> {
      return this.httpClient.get<string[]>(`${this.baseUrl}/products/categories`);
    }
  
    getAllProducts(): Observable<any[]> {
      return this.httpClient.get<any[]>(`${this.baseUrl}/products`);
    }
  
    getProductById(productId: number): Observable<any> {
      return this.httpClient.get<any>(`${this.baseUrl}/products/${productId}`);
    }
  
    updateProduct(productId: number, productData: any): Observable<any> {
      return this.httpClient.put<any>(`${this.baseUrl}/products/${productId}`, productData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      });
    }
  
    addProduct(productData: any): Observable<any> {
      return this.httpClient.post<any>(`${this.baseUrl}/products`, productData, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      });
    }

    deleteProduct(productId: number): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/products/${productId}`);
    }
}
