import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, RouterLink } from '@angular/router';
import { EnrollmentStore } from './store/enrollment.store';
import { AuthService } from './services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIf, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('tms-client');
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/login']);
  }
}
