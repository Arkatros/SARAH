import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreatePatientDTO, Patient, ApiResponse } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private http = inject(HttpClient);
  private apiUrl = 'http://127.0.0.1:3000/api/patients';

  /**
   * Registra un nuevo paciente
   */
  registerPatient(patientData: CreatePatientDTO): Observable<any> {
    return this.http.post<ApiResponse<any>>(
      `${this.apiUrl}/register`,
      patientData
    ).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene todos los pacientes
   */
  getAllPatients(): Observable<Patient[]> {
    return this.http.get<ApiResponse<Patient[]>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  /**
   * Obtiene un paciente por ID
   */
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<ApiResponse<Patient>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data)
    );
  }

  /**
   * Actualiza un paciente
   */
  updatePatient(id: number, patientData: Partial<CreatePatientDTO>): Observable<Patient> {
    return this.http.put<ApiResponse<Patient>>(
      `${this.apiUrl}/${id}`,
      patientData
    ).pipe(
      map(response => response.data)
    );
  }
}

