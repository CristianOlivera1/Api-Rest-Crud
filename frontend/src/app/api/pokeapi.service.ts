import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PokeApiService {
        private baseUrl: string = '/api/v1/public/characters';
        private apiKey: string = '18fb7ecdf44b4742cda3c99aad7e47e0';
        private hash: string = '6d0e8376fdfb3bd21746121e2f0028d6';
        private ts: string = '1';
    
        constructor(private httpClient: HttpClient) { }
        
    public getCharacterData(characterName: string): Observable<any> {
        const url = `${this.baseUrl}?name=${characterName}&ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`;
        return this.httpClient.get(url).pipe(retry(3));
    }
    
        // Fetch data about all characters
        public getAllCharacters(): Observable<any> {
            const url = `${this.baseUrl}?ts=${this.ts}&apikey=${this.apiKey}&hash=${this.hash}`;
            return this.httpClient.get(url).pipe(retry(3));
        }
        // Insert a new hero
        public addHero(hero: any): Observable<any> {
                const url = 'https://6488f57b0e2469c038fe8a6c.mockapi.io/api/heroe';
                return this.httpClient.post(url, hero, {
                        headers: new HttpHeaders({
                                'Content-Type': 'application/json'
                        })
                });
        }
}
