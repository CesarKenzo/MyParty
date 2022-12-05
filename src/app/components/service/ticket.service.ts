import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from '../model/ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  //private readonly API = 'http://localhost:3000/tickets'
  private readonly API = 'https://my-party-db.herokuapp.com/tickets'

  constructor(private http: HttpClient) { }

  listar(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.API)
  }

  buscarPorId(id: number): Observable<Ticket> {
    const url = `${this.API}/${id}`
    return this.http.get<Ticket>(url)
  }

}