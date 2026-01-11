import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../core/interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  close = output<void>();

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials: User = this.loginForm.getRawValue();

    this.authService.login(credentials).subscribe((response) => {
      if (response.success) {
        this.close.emit();
        this.router.navigate(['/home']);
        this.snackBar.open(response.message!, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      } else {
        this.loginForm.setErrors({ invalidCredentials: true });
        this.snackBar.open(response.message!, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar-delete'],
        });
      }
    });
  }
}
