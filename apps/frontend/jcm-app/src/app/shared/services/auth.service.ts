import { computed, effect, inject, Injectable, signal } from "@angular/core";
// import {User} from "../models/user.model";
// import {environment} from "../../environments/environment";
// import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../models/user";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  #userSignal = signal<User | undefined>(undefined);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  private authenticated = false;
  private adminRole = false;


  // http = inject(HttpClient);

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
  }

  loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async login(email:string, password:string): Promise<User> {
    // const login$ = this.http.post<User>(`${environment.apiRoot}/login`, {
    //   email,
    //   password});
    // const user = await firstValueFrom(login$);
    const userbis = {email, name: "test", password, photoUrl: "https://avatars.githubusercontent.com/u/123456?u=1&v=4", role: "admin", lang: "fr"};

    this.#userSignal.set(userbis);
    this.loginAsUser();
    return userbis;
  }

  async register(email:string, password:string, confirmPassword:string): Promise<User> {
    // const register$ = this.http.post<User>(`${environment.apiRoot}/register`, {
    //   email,
    //   password,
    // confirmPassword});
    // const user = await firstValueFrom(register$);
    const user = {email, name: "test", password, photoUrl: "https://avatars.githubusercontent.com/u/123456?u=1&v=4", role: "admin", lang: "fr"};
    this.#userSignal.set(user);
    this.loginAsUser();
    return user;
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(undefined);
    console.log("User: ", this.user)

    this.logoutAsUser();

    // await this.router.navigateByUrl('/login');
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
  logoutAsUser() {
    this.authenticated = false;
    this.adminRole = false;
  }

//   getUserInfo(uid: string): User {
//     return this.user();
// }

}
