import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si el usuario está logueado, redirigilo a su dashboard

  if (authService.isLoggedIn()) {
    authService.currentUser$.subscribe((user) => {
      switch (user!.role) {
        case 'ADMIN':
          router.navigate(['/admin']);
          break;
        case 'MIDWIFE':
          router.navigate(['/midwife']);
          break;
        default:
          router.navigate(['/']);
          break;
      }
    });

    return false;
  }

  // Si no está logueado, permitir acceso
  return true;
};
