import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductionComment } from '../model/production-comment';

@Injectable({
  providedIn: 'root'
})
export class ProductionCommentService {

  //private readonly API = 'http://localhost:3000/productionComments'
  private readonly API = 'https://my-party-db.herokuapp.com/productionComments'

  constructor(private http: HttpClient) { }

  listar(): Observable<ProductionComment[]> {
    return this.http.get<ProductionComment[]>(this.API)
  }

  buscarPorId(id: number): Observable<ProductionComment> {
    const url = `${this.API}/${id}`
    return this.http.get<ProductionComment>(url)
  }

  salvar(record: ProductionComment) {
    console.log(record);
    return this.http.post<ProductionComment>(this.API, record);
  }

  editar(record: ProductionComment): Observable<ProductionComment> {
    const url = `${this.API}/${record.id}`;
    return this.http.put<ProductionComment>(url, record);
  }
}