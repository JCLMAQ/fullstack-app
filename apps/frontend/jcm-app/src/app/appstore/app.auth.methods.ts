import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MessagesService } from "@fe/home";
import { patchState, signalStoreFeature, type, withMethods, withProps } from "@ngrx/signals";
import { AuthService } from "../features/auth/Services/auth.service";
import { AppSlice } from "./app.slice";


export function withAppAuthMethods() {
  return signalStoreFeature(
    {
      state: type<AppSlice>(),
      props: {
        _messagesService: MessagesService,
        _authService: AuthService,
        _router: Router,
        _snackbar: MatSnackBar,}
    },
    withProps(() => ({
      messagesService: inject(MessagesService),
      authService: inject(AuthService),
      router: inject(Router),
      snackbar: inject(MatSnackBar)
    })),

    withMethods((store) => ({
      login: async (email: string, password: string) => {

              try {
                if (!email || !password) {
                  store.messagesService.showMessage(
                    "Enter an email and password.",
                    "error"
                  )
                  return;
                }

                const loginResponse = await store.authService.login(email, password);
                console.log("user after login: ", loginResponse);

                patchState(store, {
                  user: loginResponse.user,
                  authToken: loginResponse.access_token});

                store.router.navigate(['/dashboard']);

              } catch (error) {
                store.snackbar.open('Invalid email or password', 'Close', {
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
        await store.authService.logout();
        // patchState(store, { user: undefined });
        store.router.navigate(['/home']);
      },

      register: async (email: string, password: string, confirmPassword: string) => {
        try {

          if (!email || !password || !confirmPassword) {
            store.messagesService.showMessage(
              "Enter an email and password + confirm password.",
              "error"
            )
            return;
          }

        // const response =
        await store.authService.register(email, password, confirmPassword);
          store.snackbar.open('Registration done', 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        // messagesService.showMessage(
        //   response.email ? "Registration successful" : "Registration failed, please try again",
        //   response.email ? "success" : "error"
        // )

          store.router.navigate(['/login']);

        } catch (error) {
          store.snackbar.open('Invalid email, password or confirm password', 'Close', {
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
  );
}
