import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Register } from '../../core/interfaces/register';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  @Output() close = new EventEmitter<void>();

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  checkForm() {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.getRawValue();

    this.authService.getUsers().subscribe({
      next: (res: any) => {
        const exists = res.some((user: any) => user.email === formValue.email);

        if (exists) {
          this.registerForm.get('email')?.setErrors({ alreadyExists: true });
          return;
        }

        this.submitForm(formValue);
      },
      error: (err) => console.log(err),
    });
  }

  submitForm(formValue: Register) {
    this.authService.createAccount(formValue).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.snackBar.open('Account created successfully', '', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['custom-snackbar'],
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
