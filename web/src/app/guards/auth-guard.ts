import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../core/services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router : Router = inject(Router);
  if (!authService.isLoggedIn())
  {
    router.navigate(['**']);
    return false;
  }
  return true;
};
