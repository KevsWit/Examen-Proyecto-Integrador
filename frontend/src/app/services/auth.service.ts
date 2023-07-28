import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private URL = 'http://192.168.100.5:3000/api'
  constructor(private http: HttpClient) { }

  login(users:{}): Observable<any> {
    return this.http.post<any>(`${this.URL}/login`, users).pipe(
      tap(response => {
        if (response.success) {
          // Si el inicio de sesión fue exitoso, guardar el token en el LocalStorage
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }


  logout(){
    localStorage.removeItem('auth_token');
  }

  islogin(){
    const token = localStorage.getItem('auth_token');
    return !!token;
  }

  getloginUser(){
    const token = localStorage.getItem('auth_token');
    return token
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decodedToken: any = jwt_decode(token);
        return decodedToken.user_role || null;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    }
    return null;
  }
  }

