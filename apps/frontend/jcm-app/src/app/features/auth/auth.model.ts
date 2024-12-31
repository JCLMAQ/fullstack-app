import { Gender, Language, Role, Title } from "@prisma/client";

export interface IUserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  title?: Title;
  Role?: Role[];
  Language?: Language;
  Gender?: Gender;
}

export interface IUserLogged {
  email: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  title?: Title;
  Gender?: Gender;
  Role?: Role[];
  Language?: Language;
}


export interface ICurrentUser {
  username?: string;
  fullName?: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
}
export interface ILoginResponse {
  // authJwtToken: string;
  // user: User;
  access_token: string;
  fullName: string;
  role: Role[];
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

export interface IChangePwdResponse {
  message: string;
  success: boolean;
}

