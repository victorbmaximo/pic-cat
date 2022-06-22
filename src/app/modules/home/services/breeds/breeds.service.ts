import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Breed } from '../../models/breeds.model';
import { Favourite } from '../../models/favourite.model';

@Injectable({
  providedIn: 'root',
})
export class BreedsService {
  private readonly apiURL: string;
  private readonly headers = new HttpHeaders({
    'x-api-key': environment.apiKey,
  });

  constructor(private http: HttpClient) {
    this.apiURL = environment.apiUrl;
  }

  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiURL}/breeds`, {
      headers: this.headers,
    });
  }

  getBreedById(id: string): Observable<Breed[]> {
    const params = new HttpParams().set('q', id);

    return this.http.get<Breed[]>(`${this.apiURL}/breeds/search`, {
      headers: this.headers,
      params,
    });
  }

  getBreedImage(id: string): Observable<string> {
    return this.http
      .get<string>(`${this.apiURL}/images/${id}`, {
        headers: this.headers,
      })
      .pipe(pluck('url'));
  }

  getFavourite(): Observable<Favourite[]> {
    return this.http.get<Favourite[]>(`${this.apiURL}/favourites`, {
      headers: this.headers,
    });
  }

  saveFavourite(id: string): Observable<void> {
    const body = { image_id: id };
    return this.http.post<void>(`${this.apiURL}/favourites`, body, {
      headers: this.headers,
    });
  }

  deleteFavourite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/favourites/${id}`, {
      headers: this.headers,
    });
  }
}
