import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TmsUser {
  displayName: string;
  role: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly base = environment.apiUrl; // e.g. http://localhost:5029/api/1
  currentUser = signal<TmsUser | null>(null);

  hasRole(role: string): boolean {
    const user = this.currentUser();
    return user?.role === role || user?.role === 'Admin';
  }

  async login(credentials: LoginRequest) {
    // Server sets the HttpOnly cookie in the Set-Cookie response header
    await firstValueFrom(
      this.http.post<void>(`${this.base}/auth/login`, credentials)
    );
    // Fetch authenticated profile — browser automatically sends the cookie
    const user = await firstValueFrom(this.http.get<TmsUser>(`${this.base}/auth/me`));
    this.currentUser.set(user);
  }

}
