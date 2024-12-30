import { Gender, Language, Role } from "@prisma/client";

export interface IUserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  title?: string;
  Role?: Role[];
  Language?: Language;
}

export interface IUserLogged {
  email: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  title?: string;
  Gender?: Gender;
  Role?: Role[];
  Language?: Language;
}


export interface ICurrentUser {
  username?: string;
  fullName?: string;
}

export interface IRegisterResponse {
  success: string;
  message: string;
}
export interface ILoginResponse {
  // authJwtToken: string;
  // user: User;
  access_token: string;
  fullName: string;
  role: string;
}

export interface IJwt {
  username?: string;
  role?: string;
  exp: string;
  iat: string;
  sub: string;
}

export interface IForgotEmailResponse {
  message: string;
  success: boolean;
}

