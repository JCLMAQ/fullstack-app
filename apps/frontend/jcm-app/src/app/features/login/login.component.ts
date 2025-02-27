import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { AppStore } from '../../appstore/app.store';
import LoadingContainerComponent from '../../shared/components/loading-container/loading-container.component';


@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInput,
    MatIcon,
    MatButtonModule,
    FormsModule,
    LoadingContainerComponent
  ],
  template: `
    <div
      class="flex gap-2 min-h-screen items-center justify-center bg-background"
    >
      <div
        class="w-full max-w-[400px] ml-[200px] p-10 rounded-2xl shadow-xl bg-surface-container border border-outline-variant"
      >
        <h1 class="text-2xl mb-2 text-on-surface">Login</h1>
        <div class="flex gap-1 mb-8 text-sm text-on-surface">
          <span>Don't have an account?</span>
          <a class="text-primary cursor-pointer">Sign up!</a>
        </div>
        <form
          class="flex flex-col gap-5"
          (ngSubmit)="appStore.login(email(), password())"
        >
          <mat-form-field class="w-full">
            <mat-label>Email</mat-label>
            <input
              matInput
              type="email"
              placeholder="Enter your email"
              [(ngModel)]="email"
              name="email"
              required
              #emailCtrl="ngModel"
            />
            <mat-icon matSuffix>email</mat-icon>
            @if (emailCtrl.hasError('required')) {
            <mat-error> Email is required </mat-error>
            }
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Password</mat-label>
            <input
              matInput
              [type]="hidePassword() ? 'password' : 'text'"
              placeholder="Enter your password"
              [(ngModel)]="password"
              name="password"
              required
              #passwordCtrl="ngModel"
            />
            <button
              mat-icon-button
              matSuffix
              (click)="hidePassword.set(!hidePassword())"
              type="button"
              class="mr-1"
            >
              <mat-icon>{{
                hidePassword() ? 'visibility_off' : 'visibility'
              }}</mat-icon>
            </button>
            @if (passwordCtrl.hasError('required')) {
            <mat-error> Password is required </mat-error>
            }
          </mat-form-field>
          <button class="mt-3" mat-flat-button [disabled]="appStore.loading()">
            <app-loading-container [loading]="appStore.loading()" [size]="20">
              <span>Login</span>
            </app-loading-container>
          </button>

          <!-- <button mat-flat-button class="w-full mt-3">Login</button> -->
        </form>
      </div>
      <!-- <app-login-info /> -->
    </div>
  `,
  styles: ``,
})
export default class LoginComponent {
  appStore = inject(AppStore);
  router = inject(Router);

  email = signal('');
  password = signal('');

  hidePassword = signal(true);

}
