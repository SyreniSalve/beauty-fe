import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User, UserInformation} from "./user";

const API_URL = 'http://localhost:8080/api/test/';
const AUTH_URL = 'http://localhost:8080/api/auth'
const GET_ALL_URL = 'http://localhost:8080/api/auth/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text'});
  }

  getAllOwners(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'all/owners');
  }

  getOwnerContent(): Observable<any> {
    return this.http.get(API_URL + 'owner', { responseType: 'text'});
  }

  getUserContent(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text'});
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(AUTH_URL + "/update_user", data);
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(`${AUTH_URL}/${id}`);
  }

  get(username: string): Observable<UserInformation> {
    return this.http.get<UserInformation>(`${AUTH_URL}/${username}`);
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(GET_ALL_URL, { params });
  }

  deleteAll(): Observable<any> {
    return this.http.delete(GET_ALL_URL);
  }

  findByTitle(keyword: any): Observable<UserInformation[]> {
    return this.http.get<UserInformation[]>(`${GET_ALL_URL}?keyword=${keyword}`);
  }
}
