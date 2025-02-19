import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {
	private apiUrl = 'https://peaceful-expression-production.up.railway.app';
	constructor(private httpClient: HttpClient) { }

	public getData(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/category/getdata`);
	}
	public insert(formData: FormData): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/category/insert`, formData);
	}

	public getAll(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/category/getall`);
	}

	public delete(idCategory: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/category/delete/${idCategory}`);
	}

	//actualizar
	public update(idCategory: string, formData: FormData): Observable<any> {
		formData.append('idCategory', idCategory); // Asegúrate de incluir el idCategory en el formData
		return this.httpClient.put(`${this.apiUrl}/category/update`, formData);
	}

	public getCategoryById(id: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/category/get/${id}`);
	}
}