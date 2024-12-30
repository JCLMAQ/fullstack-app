
export class User {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  numSeq?: number
  email?: string
  Role?: string
  nickName?: string
  title?: string
  profiles?: Array<string>
  lastName?: string
  firstName?: string
  address?: JSON
  Gender?: string
  manager?: string
  team?: Array<string>
  groups?: Array<string>
  posts?: Array<string>
  comments?: Array<string>
  todos?: Array<string>
  dob?: Date
  isDeleted?: Date
  photoUrl?: string
  Language?: string
}

export interface IUserRegister {
  email: string;
  password: string;
  confirmPassword: string;
  lastName?: string;
  firstName?: string;
  title?: string;
  Role?: Role;
  photoUrl?: string;
  Language?: string;
  nickName?: string;
  Gender?: string
}

export enum Role {
  guest = 'GUEST',
  Admin = 'ADMIN',
  User = 'USER',
  SuperAdmin = 'SUPERADMIN',
  Regular = 'REGULAR',

}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMELE',
  Unknown = 'UNKNOWN',
  None = 'NONE'
}

export enum Language {
  English = 'En',
  French = 'Fr',
}

export interface ILoginResponse {
access_token: string;
fullName:string;
}

export interface IRegisterResponse {
  success: boolean;
  message: string;
}

