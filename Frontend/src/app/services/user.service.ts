import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  adminControl() {
    const headers = this.authService.createAuthorizationHeader();
    this.http
      .get<any>(`${this.url}/admin`, {
        headers,
      })
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.error(error),
        complete: () => console.info('complete'),
      });
  }

  getUsers(
    page: number,
    size: number,
    sort: string,
    direction: string
  ): Observable<any> {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.get<any>(
      `${this.url}/users/page?page=${page}&size=${size}&sort=${sort}&direction=${direction}`,
      {
        headers,
      }
    );
  }

  getUser(): Observable<any> {
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get<any>(`${this.url}/user`, { headers });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  hasRole(role: string): Boolean {
    return this.authService.hasRole(role);
  }

  loginRequest(user: { email: string; password: string }) {
    let alert = {
      type: '',
      message: '',
    };

    this.http
      .post<{ token: string }>(`${this.url}/auth/login`, user)
      .subscribe({
        next: (response) => {
          console.log(response);

          this.authService.setAuthToken(response?.token);
        },
        error: (e) => {
          console.error(e?.error?.message);
          // alert(e?.error?.message);
          alert.message = e?.error?.message || 'Server error';
          alert.type = 'danger';
        },
        complete: () => {
          console.info('Login Completed');
          this.router.navigate(['/']);
        },
      });
    return alert;
  }

  makeAdmin(id: number) {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.post<any>(
      `${this.url}/admin/promote/${id}`,
      {},
      { headers }
    );
  }

  removeAdmin(id: number) {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.post<any>(
      `${this.url}/admin/demote/${id}`,
      {},
      { headers }
    );
  }

  blockUser(id: number) {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.post<any>(
      `${this.url}/admin/block/${id}`,
      {},
      { headers }
    );
  }

  unblockUser(id: number) {
    const headers = this.authService.createAuthorizationHeader();

    return this.http.post<any>(
      `${this.url}/admin/unblock/${id}`,
      {},
      { headers }
    );
  }

  logoutRequest() {
    this.authService.clearAuthToken();
    this.router.navigate(['/login']);
  }

  registerRequest(user: User) {
    this.http.post<User>(`${this.url}/user/register`, user).subscribe({
      next: (v) => {
        console.log(v);
        alert('User Created Successfully!');
      },
      error: (e) => {
        console.error(e);
        alert(e?.error?.message);
      },
      complete: () => {
        console.info('complete');
        this.router.navigate(['/login']);
      },
    });
  }

  createUser(user: User) {
    this.http.post<User>(`${this.url}/user/register`, user).subscribe({
      next: (v) => {
        console.log(v);
        alert('User Created Successfully!');
      },
      error: (e) => {
        console.error(e);
        alert(e?.error?.message);
      },
      complete: () => {
        console.info('complete');
      },
    });
  }

  updateUser(user: User) {
    const headers = this.authService.createAuthorizationHeader();
    this.http
      .put<User>(`${this.url}/user/${user.id}`, user, { headers })
      .subscribe({
        next: (v) => {
          console.log(v);
          alert('User Update Successfully!');
        },
        error: (e) => {
          console.error(e);
          alert(e?.error?.message);
        },
        complete: () => {
          console.info('complete');
        },
      });
  }
}
