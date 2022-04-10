import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Event } from '../models/Event';
import { TokenStorageService } from './token-storage.service';

const BASIC_URL = 'http://localhost:8080/api/auth/events';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) { }

  getAllUserEvents(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${BASIC_URL}/user-events/${userId}`);
  }

  createEvent(event: Event): Observable<Event>{
    return this.http.post<Event>(`${BASIC_URL}/create`, event, this.getRequestOptions());
  }


  updateEvent(id: number, event: Event): Observable<Event> {
    return this.http.put<Event>(`${BASIC_URL}/update/${id}`, event, this.getRequestOptions())
  }

  deleteEvent(id: number): void {
    this.http.delete(`${BASIC_URL}/delete/${id}`, this.getRequestOptions());
  }

  moveEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(`${BASIC_URL}/move`, event, this.getRequestOptions());
  }

  setColor(event: Event): Observable<Event> {
    return this.http.post<Event>(`${BASIC_URL}/set-color`, event, this.getRequestOptions());
  }

  private getRequestOptions() {
    const token = this.tokenStorageService.getToken();

    const headers: {[key: string]: string} = {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : ''
    };

    return {
      headers
    };
  }
}
