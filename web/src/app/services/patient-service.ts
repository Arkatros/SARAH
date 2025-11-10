import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../core/models/api-response';
import { Observable } from 'rxjs';
import { InvitePatientModel } from '../features/patient/models/invite-patient-model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  apiUrl: string = environment.apiUrl;
  private _httpClient: HttpClient = inject(HttpClient);

  invitePatient(invitation: InvitePatientModel) : Observable<ApiResponse<null>> {
    return this._httpClient.post<ApiResponse<null>>(`${this.apiUrl}/users/patient/invite`, { invitation });
  }
}
