import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://peaceful-expression-production.up.railway.app';
  constructor(private httpClient: HttpClient) { }

  public insert(formData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/user/insert`, formData);
  }

  public getAll(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/user/getall`);
  }

  public delete(idUser: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/user/delete/${idUser}`);
  }

  //actualizar
  public update(idUser: string, formData: FormData): Observable<any> {
    formData.append('idUser', idUser); 
    return this.httpClient.put(`${this.apiUrl}/user/update`, formData);
  }

  // reenviar a otra pagina para actualizar en el frontend
  public getUserById(id: string): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/user/get/${id}`);
  }

  public login(nameUser: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('nameUser', nameUser);
    body.set('password', password);

    return this.httpClient.post(`${this.apiUrl}/user/login`, body.toString(), { headers });
  }

  public logout(idUser: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('idUser', idUser);

    return this.httpClient.post(`${this.apiUrl}/user/logout`, body.toString(), { headers });
  }

}
