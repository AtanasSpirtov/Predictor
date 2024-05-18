import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private userSource;

  constructor() {
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : new User();
    this.userSource = new BehaviorSubject<User>(user);
  }

  enhanceUserWithDetails(responseUser: User) {
    let user = this.userSource.getValue();
    user.username = responseUser.username
    user.accessToken = responseUser.accessToken
    user.admin = responseUser.admin
    this.changeUser(user);
  }

  changeUser(user: User): void {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userSource.next(user);
  }

  getCurrentUser(): Observable<User> {
    return this.userSource.asObservable()
  }

  getToken(): String {
    return this.userSource.value.accessToken
  }

  isAdmin(): boolean {
    return this.userSource.value.admin
  }

}
