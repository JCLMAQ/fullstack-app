import { Routes } from '@angular/router';
import { redirectDashboardIfAuthenticated, redirectLoginIfNotAuthenticated } from './shared/guards/auth.guards';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component'),
    canActivate: [redirectDashboardIfAuthenticated()],
  },
  {
    path: '',
    loadComponent: () =>
      import('../app/shared/components/layout/layout.component'),
    canActivate: [redirectLoginIfNotAuthenticated()],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('../app/features/dashboard/dashboard.component'),
      },
      {
        path: 'content',
        loadChildren: () => import('../app/features/content/content.routes'),
      },
      {
        path: 'components',
        loadChildren: () =>
          import('../app/features/components/components.routes'),
      },
      {
        path: 'comments',
        loadComponent: () =>
          import('../app/features/comments/comments.component'),
      },
    ],
  },
];

