import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  protected loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    localStorage.clear();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.get('email')?.value as string,
        password: this.loginForm.get('password')?.value as string,
      };

      this.authService.login(credentials).subscribe({
        next: (data: any) => {
          if (this.authService.isLoggedIn()) {
            this.router.navigate(['/make-order']);
          }
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
    }
  }
}
