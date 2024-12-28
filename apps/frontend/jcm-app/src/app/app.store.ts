import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState
} from '@ngrx/signals';
// import { FirebaseService } from './shared/services/firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './features/auth/Services/auth.service';
import { MessagesService } from './shared/messages/messages.service';
import { User } from './shared/models/user';
// import { FirebaseService } from './shared/services/firebase.service';

// type AppState = {};
type AppState = {user: User | undefined};

const initialState: AppState = { user: undefined };
// const initialState: AppState = { user: { email: "jcl.maquinay@gmail.com", name: "", password:"12345", photoUrl: "", role: "admin" } };


export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store, authService = inject(AuthService)) => ({
    user: computed(() => authService.user()),
  })),
  withMethods(
    (
      store,
      router = inject(Router),
      // firebaseService = inject(FirebaseService),
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

          await authService.login(email, password);

          patchState(store, { user: { email, name: "", password, photoUrl: "https://avatars.githubusercontent.com/u/123456?u=1&v=4", role: "admin" , lang: "en"} });
          // router.navigate(['/dashboard']);
        router.navigate(['/home']);

        } catch (error) {
          snackbar.open('Invalid email or password', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          console.error(error);
          messagesService.showMessage(
            "Login failed, please try again",
            "error"
          )
        }
      },
      logout: async () => {
        await authService.logout();
        // await firebaseService.logout();
        patchState(store, { user: undefined });
        router.navigate(['/home']);
      },
      register: async (email: string, password: string, confirmPassword: string) => {
        try {
          await authService.register(email, password, confirmPassword);
          patchState(store, { user: { email, name: "", password, photoUrl: "https://avatars.githubusercontent.com/u/123456?u=1&v=4", role: "admin" , lang: "en"} });
          router.navigate(['/home']);
        } catch (error) {
          snackbar.open('Invalid email or password', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
          console.error(error);
          messagesService.showMessage(
            "Registration failed, please try again",
            "error"
          )
        }
      },
    })
  )
);
