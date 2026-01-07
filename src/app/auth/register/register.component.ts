import { Component, inject, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Register } from '../../core/interfaces/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);

  close = output<void>();
  openLogin = output<void>();

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const credentials:Register = this.registerForm.getRawValue();

    this.authService.register(credentials).subscribe((response) => {
      if (response.success) {
        this.close.emit();
        this.openLogin.emit();
        this.snackBar.open(response.message!, '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      } else {
        this.registerForm.setErrors({ emailExists: true });
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
