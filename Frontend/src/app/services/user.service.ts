import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  adminControl() {
    const headers = this.authService.createAuthorizationHeader();
    console.log(headers);
    this.http
      .get<any>('http://localhost:8080/admin', {
        headers,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  loginRequest(user: User) {
    this.http
      .post<any>('http://localhost:8080/auth/login', user)
      .subscribe((response) => {
        console.log(response?.token);
        this.authService.setAuthToken(response?.token);
      });
  }
}
