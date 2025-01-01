import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { firstValueFrom } from "rxjs";
import { ICurrentUser, IJwt, ILoginResponse, IRegisterResponse, IUserLogged } from "../auth.model";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSignal = signal<IUserLogged | undefined>(undefined);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  private authenticated = false;
  private adminRole = false;

  authToken: string;

  httpClient = inject(HttpClient);

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
    if (this.authToken) {
      const decodedJwt: IJwt = jwtDecode(this.authToken);
      console.log("Decoded JWT: ", decodedJwt);
      const emailToCheck = decodedJwt.username; // username = email
      const { user, fullName } = await firstValueFrom(
        this.httpClient.post<ICurrentUser>('api/auths/checkCredential/', {
          emailToCheck,
        }),
      );
      if (user) {
        return { email: user.email,
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
      } else {
        return null;
      }
    } else {
      return null;
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
