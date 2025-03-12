import { Route } from '@angular/router';
import { TasksStore } from './store/task.store';

export const taskRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./task/task.component').then(m => m.TaskComponent),
    providers: [TasksStore],
  },
];
