import { computed, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
// import { User } from '@prisma/client';
import { IUserLogged } from './features/auth/models/auth.model';
import { AuthService } from './features/auth/Services/auth.service';
import { MessagesService } from './shared/messages/messages.service';

type AppState = {
  user: IUserLogged | undefined,
  authToken: string | undefined
};

const initialState: AppState = {
  user: undefined,
  authToken: undefined
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
// type AppState = {};

// const initialState: AppState = {};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store, authService = inject(AuthService)) => ({
    user: computed(() => authService.user()),
    authToken: computed(() => authService.authToken()),
  })),
  withMethods(
    (
      store,
      router = inject(Router),
      messagesService = inject(MessagesService),
      authService = inject(AuthService),
      snackbar = inject(MatSnackBar)
    ) => ({
      login: async (email: string, password: string) => {
        try {

          if (!email || !password) {
            messagesService.showMessage(
              "Enter an email and password.",
              "error"
            )
            return;
          }

          const loginResponse = await authService.login(email, password);
          console.log("user after login: ", loginResponse);

          patchState(store, {
            user: loginResponse.user,
            authToken: loginResponse.access_token});

          router.navigate(['/dashboard']);

        } catch (error) {
          snackbar.open('Invalid email or password', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          console.error(error);
          // messagesService.showMessage(
          //   "Login failed, please try again",
          //   "error"
          // )
        }
      },

      logout: async () => {
        await authService.logout();
        // patchState(store, { user: undefined });
        router.navigate(['/home']);
      },

      register: async (email: string, password: string, confirmPassword: string) => {
        try {

          if (!email || !password || !confirmPassword) {
            messagesService.showMessage(
              "Enter an email and password + confirm password.",
              "error"
            )
            return;
          }

        // const response =
        await authService.register(email, password, confirmPassword);
          snackbar.open('Registration done', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        // messagesService.showMessage(
        //   response.email ? "Registration successful" : "Registration failed, please try again",
        //   response.email ? "success" : "error"
        // )

          router.navigate(['/login']);

        } catch (error) {
          snackbar.open('Invalid email, password or confirm password', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          console.error(error);
          // messagesService.showMessage(
          //   "Registration failed, please try again",
          //   "error"
          // )
        }
      },
    })
  )
);
