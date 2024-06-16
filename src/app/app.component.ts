import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { NgIf } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // authService = inject(AuthService);
  constructor(public authService: AuthService) {}
  isLoggedIn: boolean = this.authService.isLoggedIn();
  title = 'qeema-front';
}
