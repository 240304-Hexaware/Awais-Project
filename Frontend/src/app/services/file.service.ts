import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  url = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFiles(formData: FormData): Observable<any> {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.post(`${this.url}/parse/file/upload`, formData, {
      headers,
    });
  }
}
