import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../app/pages/dashboard/dashboard.component'),
  },
  {
    path: 'content',
    loadChildren: () => import('../app/pages/content/content.routes'),
  },
  {
    path: 'components',
    loadChildren: () => import('../app/pages/components/components.routes'),
  },
  {
    path: 'comments',
    loadComponent: () => import('../app/pages/comments/comments.component'),
  },
];

