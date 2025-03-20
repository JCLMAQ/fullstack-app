import { Route } from '@angular/router';

export const postRoutes: Route[] = [
  { path: 'todo/:id/:mode',
    loadComponent: () => import('./post-page/post-page.component').then(m => m.PostPageComponent),
    },

  { path: '',
    loadComponent: () => import('./post/post.component').then(m => m.PostComponent),
  }
];
