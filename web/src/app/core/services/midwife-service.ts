import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateMidWife } from '../../features/midwife/models/create-midwife';
import { environment } from '../../../environments/environment.development';
import { ApiResponse } from '../../core/models/api-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MidwifeService {
  apiUrl: string = environment.apiUrl;
  private _httpClient: HttpClient = inject(HttpClient);

  createMidwife(data: CreateMidWife) : Observable<ApiResponse<CreateMidWife>> {
    return this._httpClient.post<ApiResponse<CreateMidWife>>(`${this.apiUrl}/users/midwife`, data);
  }
}
