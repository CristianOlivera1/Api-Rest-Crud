import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ActividadService {
	private apiUrl = 'https://peaceful-expression-production.up.railway.app';
	constructor(private httpClient: HttpClient) { }

	public getData(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/actividad/getdata`);
	}
	public insert(formData: FormData): Observable<any> {
		return this.httpClient.post(`${this.apiUrl}/actividad/insert`, formData);
	}

	public getAll(): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/actividad/getall`);
	}

	public delete(idActividad: string): Observable<any> {
		return this.httpClient.delete(`${this.apiUrl}/actividad/delete/${idActividad}`);
	}

	//actualizar
	public update(idActividad: string, formData: FormData): Observable<any> {
		formData.append('idActividad', idActividad); // Asegúrate de incluir el idActividad en el formData
		return this.httpClient.put(`${this.apiUrl}/actividad/update`, formData);
	}

	public getActividadById(id: string): Observable<any> {
		return this.httpClient.get(`${this.apiUrl}/actividad/get/${id}`);
	}
}