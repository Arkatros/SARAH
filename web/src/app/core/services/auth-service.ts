import { inject, Injectable } from '@angular/core';
import { UserPayload } from '../../core/models/jwt-payload';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../features/auth/models/login-model';
import { ApiResponse } from '../../core/models/api-response';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  private tokenKey: string = "token";
  private tokenInMemory: string | null = null;
  private currentUserSubject = new BehaviorSubject<UserPayload | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private _http: HttpClient = inject(HttpClient);

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setToken(token);
    }
  }

  login(credentials: LoginModel) {
    return this._http.post<ApiResponse<string>>(`${this.apiUrl}/users/login`, credentials);
  }

  logout() {
    this.clearToken();
  }

  public setToken(token: string) {
    this.clearToken();
    this.tokenInMemory = token;
    localStorage.setItem(this.tokenKey, token);
    const payload = this.decodeToken();
    this.currentUserSubject.next(payload);
  }

  public clearToken() {
    this.tokenInMemory = null;
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenInMemory ?? localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token)
      return true;
    return false;
  }

  decodeToken(): UserPayload | null {
    try {
      const parts = this.getToken()!.split('.');
      if (parts.length !== 3) return null;
      const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodeURIComponent(escape(payload)));
    } catch {
      return null;
    }
  }
}
