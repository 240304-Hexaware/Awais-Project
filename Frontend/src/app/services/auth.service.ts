import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private authToken: string | null = null;

  constructor(private http: HttpClient) {
    this.authToken = localStorage.getItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    return this.authToken !== null;
  }

  setAuthToken(token: string) {
    this.authToken = token;

    localStorage.setItem(this.authTokenKey, this.authToken);
  }

  getAuthToken(): string | null {
    return this.authToken;
  }

  clearAuthToken() {
    this.authToken = null;

    localStorage.removeItem(this.authTokenKey);
  }

  createAuthorizationHeader(): HttpHeaders {

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.authToken}`,
    });
  }
}
