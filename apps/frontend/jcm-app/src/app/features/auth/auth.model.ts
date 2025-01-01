import { Gender, Language, Role, Title, User } from "@prisma/client";

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
  lastName?: string | null | undefined;
  firstName?: string| null;
  nickName?: string| null;
  title?: Title| null;
  Gender?: Gender| null;
  Role?: Role[]| null;
  Language?: Language| null;
  fullName?: string | null | undefined;
}


export interface ICurrentUser {
  user?: User;
  fullName?: string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
}
export interface ILoginResponse {
  // authJwtToken: string;
  user: IUserLogged;
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

