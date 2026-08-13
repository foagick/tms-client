import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  credentials = { username: '', password: '' } as LoginRequest;
  loading = signal(false);
  error = signal<string | null>(null);

  async onSubmit() {
    if (!this.credentials.username || !this.credentials.password) {
      this.error.set('Please enter username and password.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      await this.auth.login(this.credentials);
      this.router.navigate(['/dashboard']);
    } catch (err: any) {
      // Try to show server-provided message if present
      this.error.set(err?.error?.detail ?? err?.message ?? 'Login failed.');
    } finally {
      this.loading.set(false);
    }
  }
}