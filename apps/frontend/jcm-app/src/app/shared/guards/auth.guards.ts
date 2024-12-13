import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

export function redirectLoginIfNotAuthenticated(): CanMatchFn {
  return async (route) => {
    const router = inject(Router);

    const user = await inject(FirebaseService).getAuthState();

    // const user = inject(AppStore).user;

    if (!user) {
      return router.parseUrl('/login');
    }

    return true;
  };
}

export function redirectDashboardIfAuthenticated(): CanMatchFn {
  return async (route) => {
    const router = inject(Router);
    // const user = inject(AppStore).user;

    const user = await inject(FirebaseService).getAuthState();

    if (!user) {
      return true;
    }

    return router.parseUrl('/dashboard');
  };
}
