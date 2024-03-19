import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { User } from '../user/user.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl='https://localhost:7155/api/'

  login(userLogin: {}): Observable<any> {
    console.log("userLogin", userLogin);
 
    let y = this.http.post('https://localhost:7155/api/User/Login', userLogin)
    return y;
  }
  register(register: User) {
    return this.http.post(`${this.baseUrl}User/Register`, register)
  }

  getUsers() : Observable<any>{
    return this.http.get(`${this.baseUrl}User`)

  }


}
