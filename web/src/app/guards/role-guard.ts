import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { Roles } from '../../core/models/roles';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const requiredRole: Roles = route.data["requiredRole"] ?? "";
  const router : Router = inject(Router);
  if(!requiredRole){
    router.navigate(['**']);
    return false;
  }

  authService.currentUser$.subscribe(user => {
    if(!user || user.role !== requiredRole)
    {
      router.navigate(['**']);
      return false;
    }
    return true;
  });
  return true;
};
