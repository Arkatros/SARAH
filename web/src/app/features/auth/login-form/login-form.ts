import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { LoginModel } from '../models/login-model';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { Roles } from '../../../../core/models/roles';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-login-form',
  imports: [MatFormField, MatInput, MatLabel, ReactiveFormsModule, MatError, MatButton, MatCard],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  public form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  private _authService: AuthService = inject(AuthService);
  private _router = inject(Router);
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(15)]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const model: LoginModel = this.form.value;
      this._authService.login(model).subscribe({
        next: (response) => {
          this._authService.clearToken();
          this._authService.setToken(response.data!);
          this.openSnackBar(response.message, 'Close');
          this._authService.currentUser$.subscribe((user) => {
            if (user?.role === Roles.ADMIN) {
              this._router.navigate(['/admin']);
            } else if (user?.role === Roles.MIDWIFE) {
              this._router.navigate(['/midwife']);
            }
          });
        },
        error: (error) => {
          console.error('Error login attempt:', error.message);
          this.openSnackBar(error.message, 'Close');
        },
      });
    }
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }
}
