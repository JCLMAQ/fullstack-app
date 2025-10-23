import { Route } from '@angular/router';
import { UserProfile } from './user-profile/user-profile';
import { UserComponent } from './user/user.component';

// export const userRoutes: Route[] = [{ path: '', component: UserComponent }];

export const userRoutes: Route[] = [
  { path: '', component: UserComponent},
  { path: 'userprofile', component: UserProfile },
];
