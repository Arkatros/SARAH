import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/services/auth-service';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-card-home',
  imports: [
    MatCard,
    MatIcon
  ],
  templateUrl: './card-home.html',
  styleUrl: './card-home.css'
})
export class CardHome {
  private _authService = inject(AuthService);
  public name: string;
  constructor (){
    const payload = this._authService.decodeToken?.() ?? null;
    this.name = (payload?.name ?? 'Midwife') as string;
  }
}
