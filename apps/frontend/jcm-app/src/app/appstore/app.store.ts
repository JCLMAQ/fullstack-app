import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState
} from '@ngrx/signals';
// import { User } from '@prisma/client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MessagesService } from '@fe/home';
import { AuthService } from '../features/auth/Services/auth.service';
import { DICTIONARIES_TOKEN } from '../tokens/dictionaries.token';
import { getDictionary } from './app.helpers';
import { initialAppSlice } from './app.slice';
import { changeLanguage } from './app.updaters';


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
// type AppState = {};

// const initialState: AppState = {};

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initialAppSlice),
  withProps(() => ({
        _messagesService: inject(MessagesService),
        _authService: inject(AuthService),
        _router: inject(Router),
        _snackbar: inject(MatSnackBar)
      })),

  withComputed((store) => ({
    user: computed(() => store._authService.user()),
    authToken: computed(() => store._authService.authToken()),
  })),
//  withAppAuthMethods(),
  withMethods((store) => ({
    login: async (email: string, password: string) => {

            try {
              if (!email || !password) {
                store._messagesService.showMessage(
                  "Enter an email and password.",
                  "error"
                )
                return;
              }

              const loginResponse = await store._authService.login(email, password);
              console.log("user after login: ", loginResponse);

              patchState(store, {
                user: loginResponse.user,
                authToken: loginResponse.access_token
              });

              store._router.navigate(['/dashboard']);

            } catch (error) {
              store._snackbar.open('Invalid email or password', 'Close', {
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
      await store._authService.logout();
      // patchState(store, { user: undefined });
      store._router.navigate(['/home']);
    },

    register: async (email: string, password: string, confirmPassword: string) => {
      try {

        if (!email || !password || !confirmPassword) {
          store._messagesService.showMessage(
            "Enter an email and password + confirm password.",
            "error"
          )
          return;
        }

      // const response =
      await store._authService.register(email, password, confirmPassword);
        store._snackbar.open('Registration done', 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      // messagesService.showMessage(
      //   response.email ? "Registration successful" : "Registration failed, please try again",
      //   response.email ? "success" : "error"
      // )

        store._router.navigate(['/login']);

      } catch (error) {
        store._snackbar.open('Invalid email, password or confirm password', 'Close', {
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
  })),

 // Languages part

  withComputed(store => {
    const dictionaries = inject(DICTIONARIES_TOKEN);
    return {
        selectedDictionary: computed(() =>
            getDictionary(store.selectedLanguage(), dictionaries))
    }
  }),
  withMethods(store => {
      const dictionaries = inject(DICTIONARIES_TOKEN);
      const languages = Object.keys(dictionaries);
      return {
          changeLanguage: () => patchState(store, changeLanguage(languages))
      }
  }),

  withHooks(store => ({
      onInit: () => {
          const dictionaries = inject(DICTIONARIES_TOKEN);
          const languages = Object.keys(dictionaries);
          patchState(store, {
              possibleLanguages: languages,
              selectedLanguage: languages[0]
          })
      }
  }))
);
