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
import { PatientService } from '../../core/services/patient.service';
import { CreatePatientDTO } from '../../models/patient.model';

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
    MatSnackBarModule
  ],
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.css']
})

export class PatientRegisterComponent {
  patientForm: FormGroup;
  isLoading = false;
  
  private fb = inject(FormBuilder);
  private patientService = inject(PatientService);
  private snackBar = inject(MatSnackBar);

  constructor() {
    this.patientForm = this.fb.group({
      // Datos obligatorios
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      midWifeId: ['', Validators.required],
      
      // Datos opcionales
      password: [''],
      dateOfBirth: [''],
      ethnicity: [''],
      residentialStatus: [''],
      
      // Datos de la pareja
      partnerName: [''],
      partnerDateOfBirth: [''],
      partnerAddress: [''],
      partnerEmail: [''],
      partnerPhone: [''],
      
      // Datos del médico
      GPName: [''],
      GPEmail: [''],
      GPPhone: ['']
    });
  }

  onSubmit() {
    if (this.patientForm.invalid) {
      this.showMessage('Por favor completa los campos obligatorios', 'error');
      return;
    }

    this.isLoading = true;
    const formData = this.patientForm.value;

    // campos obligatorios
    const patientData: CreatePatientDTO = {
      name: formData.name,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      midWifeId: Number(formData.midWifeId),
    };

    // campos opcionales (solo si tienen valor)
    if (formData.password) patientData.password = formData.password;
    if (formData.dateOfBirth) patientData.dateOfBirth = formData.dateOfBirth;
    if (formData.ethnicity) patientData.ethnicity = formData.ethnicity;
    if (formData.residentialStatus) patientData.residentialStatus = formData.residentialStatus;
    if (formData.partnerName) patientData.partnerName = formData.partnerName;
    if (formData.partnerDateOfBirth) patientData.partnerDateOfBirth = formData.partnerDateOfBirth;
    if (formData.partnerAddress) patientData.partnerAddress = formData.partnerAddress;
    if (formData.partnerEmail) patientData.partnerEmail = formData.partnerEmail;
    if (formData.partnerPhone) patientData.partnerPhone = formData.partnerPhone;
    if (formData.GPName) patientData.GPName = formData.GPName;
    if (formData.GPEmail) patientData.GPEmail = formData.GPEmail;
    if (formData.GPPhone) patientData.GPPhone = formData.GPPhone;

    this.patientService.registerPatient(patientData).subscribe({
      next: (response) => {
        console.log('Paciente registrado:', response);
        this.showMessage('Paciente registrado exitosamente', 'success');
        this.patientForm.reset();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        const message = error.error?.message || 'Error al registrar el paciente';
        this.showMessage(`${message}`, 'error');
        this.isLoading = false;
      }
    });
  }

  onReset() {
    this.patientForm.reset();
  }

  private showMessage(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error'
    });
  }
}
