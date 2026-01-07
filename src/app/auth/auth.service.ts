import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Register } from '../core/interfaces/register';
import { AuthResponse } from '../core/interfaces/authResponse';
import { environment } from '../../environments/environment';
import { Login } from '../core/interfaces/login';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { User } from '../core/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/users`;

  readonly isAuthenticated = signal<boolean>(this.hasValidToken());

  private hasValidToken(): boolean {
    return !!localStorage.getItem('token');
  }

  register(credentials: Register): Observable<AuthResponse> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      switchMap((users: User[]) => {
        const userExists = users.some(
          (user) =>
            user.email.toLowerCase() === credentials.email?.toLowerCase()
        );

        if (userExists) {
          return of({
            success: false,
            message: 'An account with this email already exists',
          });
        }

        return this.http.post<User>(this.apiUrl, credentials).pipe(
          map(() => ({
            success: true,
            message: 'Registration successful',
          })),
          catchError(() =>
            of({
              success: false,
              message: 'Registration failed. Please try again.',
            })
          )
        );
      }),
      catchError(() =>
        of({
          success: false,
          message: 'Unable to connect to the server',
        })
      )
    );
  }

  login(credentials: Login): Observable<AuthResponse> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map((users: User[]) => {
        const user = users.find(
          (u) =>
            u.email.toLowerCase() === credentials.email?.toLowerCase() &&
            u.password === credentials.password
        );

        if (!user) {
          return {
            success: false,
            message: 'Invalid email or password',
          };
        }

        const token = this.generateToken(user);
        localStorage.setItem('token', token);
        this.isAuthenticated.set(true);

        return {
          success: true,
          message: 'Login successful',
          token,
        };
      }),
      catchError(() =>
        of({
          success: false,
          message: 'Login failed. Please try again.',
        })
      )
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.set(false);
  }

  private generateToken(user: User): string {
    return `${user.id}_${Date.now()}_${Math.random().toString(36)}`;
  }
}
