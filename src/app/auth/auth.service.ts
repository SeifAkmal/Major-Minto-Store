import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../core/interfaces/register';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiBaseUrl;
  
  getUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }
  createAccount(data: Register) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }
}
