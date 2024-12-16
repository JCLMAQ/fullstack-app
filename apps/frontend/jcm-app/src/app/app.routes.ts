import { Routes } from '@angular/router';
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
        // canActivate: [redirectLoginIfNotAuthenticated()],
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
      {
        path: 'home',
        loadComponent: () =>
          import('../app/features/home/home.component'),
      }
      // {
      //   path: 'home',
      //   loadComponent: () => import('../app/features/home/home.component')
      //   // loadComponent: () => import('../app/features/home/home.component').then(module => module.HomeComponent)
      // },
    ],
  },
];

