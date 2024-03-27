import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpecificationService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSpecFiles(
    page: number,
    size: number,
    sort: string,
    direction: string
  ): Observable<any> {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.get<any>(
      `${this.url}/parse/spec?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
      {
        headers,
      }
    );
  }

  getAllSpecFiles(): Observable<any> {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.get<any>(`${this.url}/parse/spec/list`, {
      headers,
    });
  }
}
