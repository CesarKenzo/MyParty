import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserTicket } from '../model/user-ticket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserTicketService {

  private readonly API = 'http://localhost:3000/userTickets'
  //private readonly API = 'https://my-party-db.herokuapp.com/user-tickets'

  constructor(private http: HttpClient) { }

  listar(): Observable<UserTicket[]> {
    return this.http.get<UserTicket[]>(this.API)
  }

  buscarPorId(id: number): Observable<UserTicket> {
    const url = `${this.API}/${id}`
    return this.http.get<UserTicket>(url)
  }

  editar(record: UserTicket): Observable<UserTicket> {
    const url = `${this.API}/${record.id}`;
    return this.http.put<UserTicket>(url, record);
  }

  salvar(record: UserTicket) {
    console.log(record);
    return this.http.post<UserTicket>(this.API, record);
  }

  excluir(id: number): Observable<UserTicket> {
    const url = `${this.API}/${id}`
    return this.http.delete<UserTicket>(url)
  }
}