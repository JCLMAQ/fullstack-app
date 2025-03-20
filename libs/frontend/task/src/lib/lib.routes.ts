import { Route } from '@angular/router';
import { TasksStore } from './store/task.store';

export const taskRoutes: Route[] = [
  { path: 'todo/:id/:mode',
    loadComponent: () => import('./task-page/task-page.component').then(m => m.TaskPageComponent),
    },
  {
    path: '',
    loadComponent: () => import('./task/task.component').then(m => m.TaskComponent),
    providers: [TasksStore],
  },
];
