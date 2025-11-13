import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PatientService } from '../../core/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CreatePatientDTO } from '../../core/models/patient.model';

@Component({
  selector: 'app-patient-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css'],
})
export class PatientRegisterComponent {
  patientForm: FormGroup;
  isLoading = false;

  private fb = inject(FormBuilder);
  private patientService = inject(PatientService);
  private snackBar = inject(MatSnackBar);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  constructor() {
    this.patientForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      midWifeId: [''], // sin Validators.required

      dateOfBirth: [''],
      ethnicity: [''],
      residentialStatus: [''],
      partnerName: [''],
      partnerDateOfBirth: [''],
      partnerAddress: [''],
      partnerEmail: [''],
      partnerPhone: [''],
      GPName: [''],
      GPEmail: [''],
      GPPhone: [''],
    });

    const encodedData = this.route.snapshot.paramMap.get('encodedData');

    if (encodedData) {
      try {
        const [encodedMidwifeId, encodedEmail, encodedName] = encodedData.split('___');
        const midwifeId = atob(encodedMidwifeId);
        const email = atob(encodedEmail);
        const name = atob(encodedName);
        console.log(midwifeId);

        // Rellenar el form
        this.patientForm.patchValue({
          name: name,
          midWifeId: midwifeId,
          email: email,
        });

        // Deshabilitar midwifeId y recalcular validación general
        this.patientForm.get('midWifeId')?.disable({ emitEvent: false });
        this.patientForm.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      } catch (error) {
        console.error('Error decoding invite data', error);
        this.showMessage('Invalid or corrupted invitation link.', 'error');
      }
    }
  }

  onSubmit() {
    // Validamos el form
    if (this.patientForm.invalid) {
      this.showMessage('Please complete the required fields (*)', 'error');
      return;
    }

    this.isLoading = true;

    // Obtenemos todos los valores del formulario
    const formValues = this.patientForm.getRawValue();

    // Crear objeto con datos obligatorios
    const patientData: CreatePatientDTO = {
      name: formValues.name,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      midWifeId: Number(formValues.midWifeId),
    };

    // campos opcionales
    if (formValues.dateOfBirth) patientData.dateOfBirth = formValues.dateOfBirth;
    if (formValues.ethnicity) patientData.ethnicity = formValues.ethnicity;
    if (formValues.residentialStatus) patientData.residentialStatus = formValues.residentialStatus;
    if (formValues.partnerName) patientData.partnerName = formValues.partnerName;
    if (formValues.partnerDateOfBirth)
      patientData.partnerDateOfBirth = formValues.partnerDateOfBirth;
    if (formValues.partnerAddress) patientData.partnerAddress = formValues.partnerAddress;
    if (formValues.partnerEmail) patientData.partnerEmail = formValues.partnerEmail;
    if (formValues.partnerPhone) patientData.partnerPhone = formValues.partnerPhone;
    if (formValues.GPName) patientData.GPName = formValues.GPName;
    if (formValues.GPEmail) patientData.GPEmail = formValues.GPEmail;
    if (formValues.GPPhone) patientData.GPPhone = formValues.GPPhone;

    this.patientService.registerPatient(patientData).subscribe({
      next: (response) => {
        this.showMessage('¡Patient successfully registered!', 'success');
        this.patientForm.reset();
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        const errorMsg = error.error?.message || 'The patient could not be registered';
        this.showMessage('Error: ' + errorMsg, 'error');
        this.isLoading = false;
      },
    });
  }

  onReset() {
    this.patientForm.reset();
    this.showMessage('Empty form', 'success');
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
    });
  }
}
