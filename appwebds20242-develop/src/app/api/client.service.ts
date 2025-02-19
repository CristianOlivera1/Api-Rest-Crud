import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://peaceful-expression-production.up.railway.app';
  constructor(private httpClient: HttpClient) { }

  public insert(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/client/insert`, formData);
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/client/getall`);
  }

  public delete(idClient: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/client/delete/${idClient}`);
  }

  //actualizar
  public update(idClient: string, formData: FormData): Observable<any> {
    formData.append('idClient', idClient); 
    return this.httpClient.put(`${this.apiUrl}/client/update`, formData);
  }

  // reenviar a otra pagina para actualizar en el frontend
  public getClientById(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/client/get/${id}`);
  }

  public login(email: string, dni: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('email', email);
    body.set('dni', dni);

    return this.httpClient.post(`${this.apiUrl}/client/login`, body.toString(), { headers });
  }

}
