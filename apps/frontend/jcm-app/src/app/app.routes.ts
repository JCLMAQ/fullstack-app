import { Routes } from '@angular/router';
import { isUserAuthenticated } from './shared/guards/auth.guard';
// import { redirectDashboardIfAuthenticated, redirectHomeIfNotAuthenticated, redirectLoginIfNotAuthenticated } from './shared/guards/auth-bis.guards';

export const appRoutes: Routes = [
  {
  //   path: '',
  //   component: DashboardComponent
  // },
  // {
    path: 'login',
    loadComponent: () => import('./features/login/login.component'),
    // canActivate: [redirectDashboardIfAuthenticated()],
  },
  {
    path: '',
    loadComponent: () =>
      import('../app/shared/components/layout/layout.component'),
    // canActivate: [redirectHomeIfNotAuthenticated()],
    // canActivateChild: [adminGuard], // Protect all child routes with adminGuard
    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('../app/features/dashboard/dashboard.component'),
        canActivate: [isUserAuthenticated],
      },
      {
        path: 'content',
        loadChildren: () => import('../app/features/content/content.routes'),
        canActivate: [isUserAuthenticated],
      },
      {
        path: 'components',
        loadChildren: () =>
          import('../app/features/components/components.routes'),
        canActivate: [isUserAuthenticated],
      },
      {
        path: 'comments',
        loadComponent: () =>
          import('../app/features/comments/comments.component'),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../app/features/home/home.component'),
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      { path: '**', loadComponent: () => import('@fe/ui/pages').then(m => m.PageNotFoundComponent) },

    ],

  }
];

