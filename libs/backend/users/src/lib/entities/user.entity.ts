import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { ApiKey, ChangesTracking, Gender, Group, Language, PermissionClaim, Post, Prisma, Profile, Role, Task, Title, Token, User, UserSecret } from '@prisma/prisma-client';
import { Exclude, Type } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';

export class UserEntity implements User {

    constructor(partial: Partial<UserEntity>) {
      Object.assign(this, partial);
    }

  createdAt!: Date;
  updatedAt!: Date;

  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  numSeq!: number;

  @ApiProperty({ required: true, nullable: false })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty()
  @IsString()
  lastName!: string;

  @ApiProperty()
  @IsString()
  firstName!: string;

  @ApiProperty({ enum: Title })
  @IsOptional()
  @IsEnum(Title)
  title!: Title;

  @ApiProperty()
  @IsOptional()
  @IsString()
  nickName!: string;

  @ApiProperty({ enum: Gender })
  @IsOptional()
  @IsEnum(Gender)
  Gender!: Gender;

  @ApiProperty()
  social!: Prisma.JsonValue;

  @ApiProperty({ enum: Language })
  @IsOptional()
  @IsEnum(Language)
  Language!: Language;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  dob!: Date;

  @ApiProperty()
  address!: Prisma.JsonValue;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  isValidated!: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  isSuspended!: Date;

  @ApiProperty()
  @IsOptional()
  @Type(() => Date)
  isDeletedDT!: Date;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  managerId!: string | null;
  @ApiProperty({ type: () => UserEntity })
  manager?: User  | null;
  @ApiProperty({ type: () => UserEntity })
  Team?: User[] ;
  @ApiProperty({ type: () => UserEntity })
  Profile?: Profile[] ;
  @ApiProperty({ type: () => UserEntity })
  Group?: Group[] ;
  @ApiProperty({ type: () => UserEntity })
  Post?: Post[] ;
  Comment?: Comment[] ;
  @ApiProperty({ type: () => UserEntity })
  Task?: Task[] ;
  // UserTodoLink?: UserTodoLink[] ;
  @ApiProperty({ type: () => UserEntity })
  ChangesLog?: ChangesTracking[] ;
  @ApiProperty({ type: () => UserEntity })
  Token?: Token[] ;
  Roles!: Role[];
  Permissions!: PermissionClaim[];
  isTfaEnable!: boolean;
  @Exclude() // Used by the Nestjs ClassSerializerInterceptor to exclude the password field
  @ApiHideProperty()
  tfaSecret!: string | null;
  @ApiProperty({ type: () => UserEntity })
  ApiKeys?: ApiKey[] ;
  @ApiProperty({ type: () => UserEntity })
  userSecret?: UserSecret  | null;
  @ApiHideProperty()
  @Exclude()
  passWordFaker!: string | null;
  published!: boolean;
  isDeleted!: number;
  isPublic!: boolean;
  photoUrl!: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  avatarFileId!: string | null;

}
