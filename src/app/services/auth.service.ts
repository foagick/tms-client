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
  private readonly base = environment.apiUrl;
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

  /** Logout: call API to invalidate server session and clear local state */
  async logout() {
    try {
      await firstValueFrom(this.http.post<void>(`${this.base}/auth/logout`, {}));
    } catch (err) {
      // ignore network errors — still clear client state
      console.warn('Logout request failed:', err);
    } finally {
      this.currentUser.set(null);
    }
  }
}
