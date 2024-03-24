import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private authToken: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
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

  isTokenExpired(): boolean {
    if (!this.authToken) {
      return true;
    }

    const tokenPayload: any = jwtDecode(this.authToken);

    if (tokenPayload && tokenPayload.exp) {
      const expirationTimeInSeconds = tokenPayload.exp;

      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      return expirationTimeInSeconds < currentTimeInSeconds;
    }

    return true;
  }

  createAuthorizationHeader(): HttpHeaders {
    if (this.isTokenExpired()) {
      this.router.navigate(['/login']);
      return new HttpHeaders();
    }

    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${this.authToken}`,
    });
  }
}
