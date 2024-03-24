import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  url = 'http://localhost:8080';
  
  constructor(private http: HttpClient, private authService: AuthService) {}

  getRecords(
    page: number,
    size: number,
    sort: string,
    direction: string
  ): Observable<any> {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.get<any>(
      `${this.url}/parse/data?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
      {
        headers,
      }
    );
  }
}
