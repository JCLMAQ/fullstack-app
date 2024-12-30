import { computed, effect, inject, Injectable, signal } from "@angular/core";
// import {User} from "../models/user.model";
// import { HttpClient } from "@angular/common/http";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "@prisma/client";
// import { User } from "@fe/user";
import { firstValueFrom } from "rxjs";
// import { IUserRegister } from "../auth.model";
// import { User } from "../../../shared/models/user";

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
  }

  loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      const user = JSON.parse(json);
      this.#userSignal.set(user);
    }
  }

  async login(email:string, password:string): Promise<User> {

    const pathUrl = "api/auths/auth/loginwithpwd";
    const login$ = this.httpClient.post<User>(`${pathUrl}`, {
      // const login$ = this.httpClient.post<User>(`${environment.apiRoot}/login`, {
      email,
      password});
    const user = await firstValueFrom(login$);
    // const userbis = {email, name: "test", password, photoUrl: "https://avatars.githubusercontent.com/u/123456?u=1&v=4", role: "admin", lang: "fr"};

    this.#userSignal.set(user);
    this.loginAsUser();
    return user;
  }

  async register(email:string, password:string, confirmPassword:string): Promise<User> {

    const pathUrl = "api/auths/auth/registerwithpwd";
    // const register$ = this.httpClient.post<User>(`${environment.apiRoot}/register`, {
    const register$ = this.httpClient.post<User>(`${pathUrl}`, {
      email,
      password,
      verifyPassword: confirmPassword,
      lastName: 'test',
      firstName: 'test',
      nickName: 'test',
      Gender: 'NONE',
      Roles: "Roles.User",
      // title: 'Sir',
      Language: "fr"
// "email": "user3@test.be",
// 	"password": "Pwd!123456",
//     "verifyPassword": "Pwd!123456",
//     "Gender": "MALE",
//     "nickName": "JCMBIS",
//     "lastName": "MAQBIS",
//     "firstName": "Jean-Claude",
//     "Roles": "ADMIN",
//     "Language": "fr"



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
