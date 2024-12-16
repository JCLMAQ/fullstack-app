import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AppStore } from '../../app.store';


export function redirectHomeIfNotAuthenticated(): CanActivateFn {
  return async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);

    // const user = await inject(FirebaseService).getAuthState();

    const user = inject(AppStore).user;
    console.log("User: ",user)

    if (!user) {
      return router.parseUrl('/home');
      return router.createUrlTree(['/home']); // Redirects to the home page
    }

    return true;
  };
}



export function redirectLoginIfNotAuthenticated(): CanActivateFn {
  return (route) => {
    const router = inject(Router);

    // const user = await inject(FirebaseService).getAuthState();

    const user = inject(AppStore).user;

console.log(user)
    if (!user) {
      return router.parseUrl('/login');
    }

    return true;
  };
}

export function redirectDashboardIfAuthenticated(): CanActivateFn {
  return (route) => {

    const router = inject(Router);

    const user = inject(AppStore).user;

    // const user = await inject(FirebaseService).getAuthState();

    if (user()) {
      return router.parseUrl('/dashboard');

    }

    return true;
  };
}
