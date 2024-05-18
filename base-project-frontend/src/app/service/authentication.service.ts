import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host = environment.apiUrl

  constructor(private http: HttpClient) { }

  register(registerForm: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.host}/api/register`, registerForm);
  }

  login(loginForm: any) : Observable<User> {
    return this.http.post<User>(`${this.host}/api/login`, loginForm);
  }


}
