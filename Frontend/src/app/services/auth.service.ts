import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private authToken: string | null = null;

  url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
    // Retrieve token from local storage on initialization
    // this.authToken = localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string) {
    this.authToken = token.split(' ')[1];
    // Store token in local storage
    // localStorage.setItem(this.authTokenKey, this.authToken);
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  clearAuthToken() {
    this.authToken = null;
    // Remove token from local storage
    localStorage.removeItem(this.authTokenKey);
  }

  createAuthorizationHeader(): HttpHeaders {
    console.log(this.authToken);

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authToken}`,
    });
  }
}
