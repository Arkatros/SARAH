import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../../../services/patient-service';
import { InvitePatientModel } from '../../models/invite-patient-model';

@Component({
  selector: 'app-invite-patient',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './invite-patient.html',
  styleUrl: './invite-patient.css'
})
export class InvitePatient {
  public form: FormGroup;
  private _snackBar = inject(MatSnackBar);
  private _patienService: PatientService = inject(PatientService);

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const invitation: InvitePatientModel = this.form.value;
      this._patienService.invitePatien(invitation).subscribe({
        next: (response) => {
          this.openSnackBar(response.message, 'Close');
          this.form.reset();
        },
        error: (error) => {
          console.error('Error inviting patient:', error.message);
          this.openSnackBar('Failed to send invitation. Please try again.', 'Close');
        }
      });
    }
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000});
  }
}
