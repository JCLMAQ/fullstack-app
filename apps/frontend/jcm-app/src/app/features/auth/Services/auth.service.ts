import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "@prisma/client";
import { jwtDecode } from "jwt-decode";
import { firstValueFrom } from "rxjs";
import { AppStore } from "../../../app.store";
import { IJwt, ILoginResponse, IRegisterResponse } from "../auth.model";

const USER_STORAGE_KEY = 'userOne';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSignal = signal<User | undefined>(undefined);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  private authenticated = false;
  private adminRole = false;
  authToken: string;




  httpClient = inject(HttpClient);
  appStore = inject(AppStore);

  router = inject(Router);

  constructor() {
    this.loadUserFromStorage();
    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY,
          JSON.stringify(user));
      }
    });

    this.authToken = localStorage["authJwtToken"] || '';

  }

  loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async login(email:string, password:string): Promise<ILoginResponse> {

    const pathUrl = "api/auths/auth/loginwithpwd";
    const login$ = this.httpClient.post<ILoginResponse>(`${pathUrl}`, {
      // const login$ = this.httpClient.post<User>(`${environment.apiRoot}/login`, {
      email,
      password});
    const response = await firstValueFrom(login$);
    console.log("User logged: ", response)

    const user =
    this.#userSignal.set(user);
    this.loginAsUser();
    return response;
  }

  async register(email:string, password:string, confirmPassword:string): Promise<User> {

    const pathUrl = "api/auths/auth/registerwithpwd";
    // const register$ = this.httpClient.post<User>(`${environment.apiRoot}/register`, {
    const register$ = this.httpClient.post<IRegisterResponse>(`${pathUrl}`, {
      email,
      password,
      verifyPassword: confirmPassword,
      lastName: '',
      firstName: '',
      nickName: '',
      Gender: 'UNKNOWN',
      Roles: "GUEST",
      // title: 'Sir',
      Language: "fr"
    });
    const response = await firstValueFrom(register$);
    console.log("Registing User Response: ", response)
    // const user = {email, name: "test", password, photoUrl: "https://avatars.githubusercontent.com/u/123456?u=1&v=4", role: "admin", lang: "fr"};
    console.log("User: ", response)
    return response;
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(undefined);
    console.log("User: ", this.user)

    this.logoutAsUserOrAdmin();

    // await this.router.navigateByUrl('/login');
  }

  async fetchUser(): Promise<any> {
    // const decodedJwt: Object | null = jwt_decode(this.authToken);
    //   console.log(decodedJwt);
    //  get user data from backend with authToken

    let decodedJwt: IJwt;

    if (this.appStore.authToken()) {
      const authToken = this.appStore.authToken();
      // const decodedJwt: IJwt = jwtDecode(authToken);
      if (authToken) {
        this.decodedJwt = jwtDecode(authToken);
      } else {
        throw new Error("Auth token is undefined");
      }
      // console.log("decodedJWT: ", decodedJwt);
      const emailToCheck = decodedJwt.username;

      const { fullName } = await firstValueFrom(
        this.httpClient.post<ICurrentUser>('api/auths/checkCredential/', {
          emailToCheck,
        }),
      );
      // console.log("fullName from fetch user: ", fullName);
      if (!fullName) {
        this.currentUser$.next(null);
      } else {
        this.currentUser$.next({
          username: decodedJwt.username,
          fullName,
        });
      }
    } else {
      this.currentUser$.next(null);
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  loginAsUser() {
    this.authenticated = true;
  }

  loginAsAdmin() {
    this.authenticated = true;
    this.adminRole = true;
  }

  hasAdminRole() {
    return this.adminRole;
  }
  // Log out the user
  logoutAsUserOrAdmin() {
    this.authenticated = false;
    this.adminRole = false;
  }

//   getUserInfo(uid: string): User {
//     return this.user();
// }

}
