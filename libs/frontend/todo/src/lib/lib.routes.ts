import { Route } from '@angular/router';

export const todoRoutes: Route[] = [
  // { path: 'tododetail/:id/:mode', loadComponent: () => import('./todo-page/todo-page.component').then(m => m.TodoPageComponent) },
  // { path: 'todo/:id/:mode', loadComponent: () => import('./todo-page/todo-page.component').then(m => m.TodoPageComponent), canDeactivate: [hasUnsavedChangesGuard] },
  { path: 'todo/:id/:mode', loadComponent: () => import('./todo-page/todo-page.component').then(m => m.TodoPageComponent) },
  { path: '', loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent) },
  // { path: '', component: TodoComponent }
];
