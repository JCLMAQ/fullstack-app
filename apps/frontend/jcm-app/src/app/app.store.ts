import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withMethods,
  withState
} from '@ngrx/signals';
// import { FirebaseService } from './shared/services/firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from './shared/models/user';

// type AppState = {};
type AppState = {user: User | undefined};

const initialState: AppState = { user: undefined};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withComputed((store, firebaseService = inject(FirebaseService)) => ({
  //   user: computed(() => firebaseService.user()),
  // })),
  withMethods(
    (
      store,
      router = inject(Router),
      // firebaseService = inject(FirebaseService),
      snackbar = inject(MatSnackBar)
    ) => ({
      login: async (email: string, password: string) => {
        if (!email || !password) {
          return;
        }

        try {
          // await firebaseService.login(email, password);
          patchState(store, { user: { email, name: "jclm", password, photoUrl: "https://avatars.githubusercontent.com/u/123456?u=1&v=4", role: "admin" } });
          router.navigate(['/dashboard']);
        } catch (error) {
          snackbar.open('Invalid email or password', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        }
      },
      logout: async () => {
        // await firebaseService.logout();
        patchState(store, { user: { email: "", name: "", password:"", photoUrl: "", role: "" } });
        router.navigate(['/login']);
      },
    })
  )
);
