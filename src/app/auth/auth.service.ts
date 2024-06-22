import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:8080/api/auth/login';

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpClient
      .post('http://localhost:8080/api/auth/login', credentials)
      .pipe(
        tap((res: any) => {
          // alert(JSON.stringify(res));
          // console.log(res.token);

          localStorage.setItem('token', res.token as string);
          localStorage.setItem('userId', res.userId as string);
          localStorage.setItem('name', res.name as string);
        })
      );
  }

  logout() {
    localStorage.removeItem('authUser');
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }
  constructor() {}
}
