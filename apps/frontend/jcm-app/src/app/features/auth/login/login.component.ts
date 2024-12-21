import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { PageNotFoundComponent } from "../../../../../../../../libs/frontend/ui/pages/src/lib/page-not-found/page-not-found.component";
import { AppStore } from '../../../app.store';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInput,
    MatIcon,
    MatButtonModule,
    PageNotFoundComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {

  appStore = inject(AppStore);
  router = inject(Router);

    email = signal('jcl.maquinay@gmail.com');
    password = signal('test12345');

    hidePassword = signal(true);

    register() {
      this.router.navigate(['register']);
    }

    cancel() {
      this.router.navigate(['home']);
    }

}
