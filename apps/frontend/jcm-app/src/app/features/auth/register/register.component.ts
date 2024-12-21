import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AppStore } from '../../../app.store';

@Component({
  selector: 'app-register',
  imports: [
  MatFormFieldModule,
    FormsModule,
    MatInput,
    MatIcon,
    MatButtonModule,

  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent {
  appStore = inject(AppStore);
  router = inject(Router);

    email = signal('jcl.maquinay@gmail.com');
    password = signal('test12345');
    confirmPassword = signal('test12345');

    hidePassword = signal(true);

  login() {
    this.router.navigate(['login']);
  }

  cancel() {
    this.router.navigate(['home']);
  }
}
