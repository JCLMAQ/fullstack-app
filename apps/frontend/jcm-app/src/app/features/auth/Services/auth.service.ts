import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { jwtDecode } from "jwt-decode";
import { firstValueFrom } from "rxjs";
import { IJwt, ILoginResponse, IRegisterResponse, IUserLogged } from "../models/auth.model";


const USER_STORAGE_KEY = 'user';
const AUTH_TOKEN_STORAGE_KEY = 'authJwtToken';

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
    this.#authTokenSignal.set(localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) || undefined )
    this.loadUserFromStorage();
    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY,
          JSON.stringify(user));
      };
      const authToken = this.authToken();
      if (authToken) {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken);
      };
    });
  }

  loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async login(email:string, password:string): Promise<ILoginResponse> {

    // 🆕 MIGRATION VERS ENDPOINT IAM
    // ANCIEN: const pathUrl = "api/auths/auth/loginwithpwd";
    const pathUrl = "api/authentication/sign-in";
    const login$ = this.httpClient.post<ILoginResponse>(`${pathUrl}`, {
      email,
      password});
    const response = await firstValueFrom(login$);

    this.#authTokenSignal.set(response.accessToken);
    localStorage.setItem("authJwtToken", response.accessToken);

    // console.log("User logged: ", response)

    const userLogged = await this.fetchUser();
    if (userLogged) {
      this.#userSignal.set(userLogged);
    }

    this.loginAsUser();
    return response;
  }

  async register(email:string, password:string, confirmPassword:string): Promise<IRegisterResponse | Error> {

    // 🆕 MIGRATION VERS ENDPOINT IAM
    // ANCIEN: const pathUrl = "api/auths/auth/registerwithpwd";
    const pathUrl = "api/authentication/register-extended";

    const payload: {
      email: string;
      password: string;
      verifyPassword: string;
      Roles?: string[];
      Language?: string;
      lastName?: string;
      firstName?: string;
      nickName?: string;
      Gender?: string;
    } = {
      email,
      password,
      verifyPassword: confirmPassword,
      // Roles: ["GUEST"],
      // Language: "fr"
    };

    // N'ajouter les champs optionnels que s'ils ont des valeurs valides
    // (évite les erreurs de validation sur chaînes vides)

    console.log("Registering User Payload: ", payload);

    const register$ = this.httpClient.post<IRegisterResponse>(`${pathUrl}`, payload);
    const response = await firstValueFrom(register$);

    console.log("Registering User Response: ", response)

    return response;
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem("authJwtToken");
    this.#authTokenSignal.set(undefined);
    this.#userSignal.set(undefined);

    console.log("User: ", this.user)

    this.logoutAsUserOrAdmin();

    // await this.router.navigateByUrl('/login');
  }

  async fetchUser(): Promise<IUserLogged | undefined | null> {
    const authToken = this.authToken();
    if (authToken) {
      const decodedJwt: IJwt = jwtDecode(authToken);
      console.log("Decoded JWT: ", decodedJwt);

      // Créer un utilisateur basique à partir des informations du JWT
      const user: IUserLogged = {
        email: decodedJwt.email || '',
        lastName: null,
        firstName: null,
        nickName: null,
        title: null,
        Gender: null,
        Roles: decodedJwt.role || [],
        Language: null,
        fullName: null,
        photoUrl: ''  // Sera remplacé par person-placeholder.png dans le template
      };

      return user;
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

}
