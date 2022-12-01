import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Marketplace_Ticket } from '../model/marketplace-ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MktTicketService {

  private readonly API = 'http://localhost:3000/marketplace-ticket';
  //private readonly API = 'https://my-party-db.herokuapp.com/marketplace-ticket'

  constructor(private http: HttpClient) { }

  listar(): Observable<Marketplace_Ticket[]> {
    return this.http.get<Marketplace_Ticket[]>(this.API)
  }

  buscarPorId(id: number): Observable<Marketplace_Ticket> {
    const url = `${this.API}/${id}`
    return this.http.get<Marketplace_Ticket>(url)
  }

}