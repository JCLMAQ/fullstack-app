import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { firstValueFrom } from "rxjs";
import { IJwt, ILoginResponse, IRegisterResponse, IUserLogged } from "../auth.model";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);
  router = inject(Router);

  #userSignal = signal<IUserLogged | undefined>(undefined);
  user = this.#userSignal.asReadonly();

  #authTokenSignal= signal<string | undefined>(undefined);
  authToken = this.#authTokenSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  private authenticated = false;
  private adminRole = false;

  constructor() {
    this.loadUserFromStorage();
    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY,
          JSON.stringify(user));
      }
    });

    this.#authTokenSignal.set(localStorage["authJwtToken"] || undefined ) ; //this.#authToken = localStorage["authJwtToken"] || '';

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

    this.#authTokenSignal.set(response.access_token);
    localStorage.setItem("authJwtToken", response.access_token);

    console.log("User logged: ", response)

    const userLogged = await this.fetchUser();
    if (userLogged) {
      this.#userSignal.set(userLogged);
    }

    this.loginAsUser();
    return response;
  }

  async register(email:string, password:string, confirmPassword:string): Promise<IRegisterResponse | Error> {

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

    console.log("Registering User Response: ", response)

    return response;
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(undefined);
    console.log("User: ", this.user)

    this.logoutAsUserOrAdmin();

    // await this.router.navigateByUrl('/login');
  }

  async fetchUser(): Promise<IUserLogged | null> {

    //  get user data from backend with authToken
    const authToken = this.authToken();
    if (authToken) {
      const decodedJwt: IJwt = jwtDecode(authToken);
      console.log("Decoded JWT: ", decodedJwt);
      const emailToCheck = decodedJwt.username; // username = email
      if (emailToCheck) {
      const response = await firstValueFrom(
        this.httpClient.get<{ user: IUserLogged, fullName: string  } | { success: boolean, message: string}>(`api/auths/auth/checkCredential/${emailToCheck}`)
      );
      if ('success' in response) {
        console.error(response.message);
        return null;
      }
      const { user, fullName } = response;
      if (user) {
        return {
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          nickName: user.nickName,
          fullName,
          title: user.title,
          Gender: user.Gender,
          Roles: user.Roles,
          Language: user.Language,
          photoUrl: user.photoUrl ?? ''
        };
      }

      }
    }
    return null;
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
