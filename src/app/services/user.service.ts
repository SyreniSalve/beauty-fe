import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {ListOfOwnersResponse, ListOfUsersResponse, User} from "./user";

const API_URL = 'http://localhost:8080/api/test/';
const AUTH_URL = 'http://localhost:8080/api/auth'
const GET_ALL_URL = 'http://localhost:8080/api/auth/users'
const UPDATE_USER = 'http://localhost:8080/api/auth/update_user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text'});
  }

  getAllOwners(): Observable<any> {
    return this.http.get<any>(API_URL + 'all/owners');
  }

  getOwners(params: any): Observable<ListOfOwnersResponse> {
    return this.http.get<ListOfOwnersResponse>(API_URL + 'all/owners', { params });
  }

  getOwnerContent(): Observable<any> {
    return this.http.get(API_URL + 'owner', { responseType: 'text'});
  }

  getUserContent(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text'});
  }

  addEventToUser(userId: number, event: Event): Observable<Event> {
    return this.http.post<Event>(`${AUTH_URL}/add-event/user/${userId}`, event);
  }

  update(id: number, data: User): Observable<User> {
    return this.http.put<User>(`${UPDATE_USER}/${id}`, data);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${AUTH_URL}/delete_user/${id}`);
  }

  deleteRole(roleId: number, userId: number): Observable<User> {
    return this.http.delete<User>(`${AUTH_URL}/delete_role/${roleId}/${userId}`);
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${AUTH_URL}/user/${id}`);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(GET_ALL_URL, { params });
  }

  getAllUsers(): Observable<ListOfUsersResponse> {
    return this.http.get<ListOfUsersResponse>(GET_ALL_URL)
  }

  deleteAll(): Observable<any> {
    return this.http.delete(GET_ALL_URL);
  }

  findByTitle(keyword: any): Observable<User[]> {
    return this.http.get<User[]>(`${GET_ALL_URL}?keyword=${keyword}`);
  }
}
