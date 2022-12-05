import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventComment } from '../model/event-comment';

@Injectable({
  providedIn: 'root'
})
export class EventCommentService {

  //private readonly API = 'http://localhost:3000/eventComments'
  private readonly API = 'https://my-party-db.herokuapp.com/eventComments'

  constructor(private http: HttpClient) { }

  listar(): Observable<EventComment[]> {
    return this.http.get<EventComment[]>(this.API)
  }

  buscarPorId(id: number): Observable<EventComment> {
    const url = `${this.API}/${id}`
    return this.http.get<EventComment>(url)
  }

  salvar(record: EventComment) {
    console.log(record);
    return this.http.post<EventComment>(this.API, record);
  }

  editar(record: EventComment): Observable<EventComment> {
    const url = `${this.API}/${record.id}`;
    return this.http.put<EventComment>(url, record);
  }
}