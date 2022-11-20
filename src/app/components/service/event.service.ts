import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Event } from '../model/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private readonly API = 'https://my-party-db.herokuapp.com/events'

  constructor(private http: HttpClient) { }

  listar(): Observable<Event[]> {
    return this.http.get<Event[]>(this.API)
  }

  buscarPorId(id: number): Observable<Event> {
    const url = `${this.API}/${id}`
    return this.http.get<Event>(url)
  }

}
