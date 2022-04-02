import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {User} from "./user";

const API_URL = 'http://localhost:8080/api/test/';
const BASE_URL = 'http://localhost:8080/api/auth/users'

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

  getAdminContent(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text'});
  }

  getAll(params: any): Observable<any> {
    return this.http.get<any>(BASE_URL, { params });
  }
}
