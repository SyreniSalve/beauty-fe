import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const BASIC_URL = 'http://localhost:8080/api/auth/events';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  createEvent(event: Event): Observable<Event>{
    return this.http.post<Event>(`${BASIC_URL}/create`, event);
  }

  updateEvent(event: Event): Observable<Event> {
    return this.http.put<Event>(`${BASIC_URL}/update`, event)
  }

  deleteEvent(id: number): void {
    this.http.delete(`${BASIC_URL}/delete/${id}`);
  }

  moveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${BASIC_URL}/move`, event);
  }

  setColor(event: Event): Observable<Event> {
    return this.http.post<Event>(`${BASIC_URL}/set-color`, event);
  }
}
