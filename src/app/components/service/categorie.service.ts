import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../model/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  //private readonly API = 'http://localhost:3000/categories'
  private readonly API = 'https://my-party-db.herokuapp.com/categories'

  constructor(private http: HttpClient) { }

  listar(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(this.API)
  }

  buscarPorId(id: number): Observable<Categorie> {
    const url = `${this.API}/${id}`
    return this.http.get<Categorie>(url)
  }

}