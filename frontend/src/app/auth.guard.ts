import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const userId = localStorage.getItem('userId');
  const router: Router = inject(Router);
  if (userId) {
    return true;
  }
  else {
    router.navigate(['']);
    return false;
  }
};
