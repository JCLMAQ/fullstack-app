import { Routes } from '@angular/router';
import { ChangepwdComponent } from './changepwd/changepwd.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import LoginComponent from './login/login.component';
import RegisterComponent from './register/register.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const contentRoutes: Routes = [
  { path: 'login', component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent,
  },
  { path: 'forgotpwd', component: ForgotpwdComponent,
  },
  { path: 'changepwd', component: ChangepwdComponent,
  },
  { path: 'userprofile', component: UserprofileComponent,
  },
  { path: '', component: LoginComponent,
    },
];

export default contentRoutes;
