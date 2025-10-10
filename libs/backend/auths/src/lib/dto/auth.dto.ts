import { ApiProperty } from '@nestjs/swagger';
import { Gender, Language, Role, Title } from '@prisma/prisma-client';
import { IsEmail, IsString, MinLength } from "class-validator";

export class AuthDto {
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com'
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email!: string;

    @ApiProperty({
        description: 'User password',
        example: 'securePassword123',
        minLength: 6
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password!: string;
}

export interface IResponse {
  success: boolean;
  message: string;
}

export interface ICurrentUser {
  user: IUserLogged | null;
  fullName: string | null;
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
  photoUrl?: string;
}


