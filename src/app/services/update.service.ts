import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./user";

const UPDATE_USER = 'http://localhost:8080/api/auth/update_user';
const ADMIN_UPDATE = 'http://localhost:8080/api/auth/admin_update';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'})
}


@Injectable({
  providedIn: 'root'
})

export class UpdateService {

  constructor(private http: HttpClient) { }

  updateForm(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${ADMIN_UPDATE}/${id}`, user, httpOptions);
  }

  userUpdateForm(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${UPDATE_USER}/${id}`, user, httpOptions);
  }
}
