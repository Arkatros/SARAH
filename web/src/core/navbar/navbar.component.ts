import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../app/services/auth-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIcon, RouterLink, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private _auth = inject(AuthService);
  private _router = inject(Router);
  public islogged: boolean;

  constructor() {
    this.islogged = this._auth.isLoggedIn();
    this._auth.currentUser$.subscribe((user) => {
      if (user) {
        this.islogged = true;
      } else {
        this.islogged = false;
      }
    });
  }

  logOut() {
    if (this._auth.isLoggedIn()) {
      this._auth.logout();
      this.islogged = false;
      this._router.navigate(['/']);
    }
  }
}
