import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateMidWife } from '../features/midwife/models/create-midwife';
import { environment } from '../../environments/environment.development';
import { ApiResponse } from '../../core/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class MidwifeService {
  apiUrl: string = environment.apiUrl;
  private _httpClient: HttpClient = inject(HttpClient);

  createMidwife(data: CreateMidWife) {
    console.log(data);
    this._httpClient.post<ApiResponse<CreateMidWife>>(`${this.apiUrl}/users/midwife`, data)
      .subscribe({
        next: (response) => {
          console.log(response.message, response.data);
        }, 
        error: (error) => {
        console.error(error.message);
        }
      });
  }
}
