/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {IsInt} from 'class-validator';
import {IsISO8601} from 'class-validator';
import {IsOptional} from 'class-validator';
import {IsBoolean} from 'class-validator';
import {} from 'class-validator';
import {IsDefined} from 'class-validator';
import {IsObject} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class UserInput  {
  
@ApiProperty()@IsString()
id!: string;

@ApiProperty()@IsInt()
numSeq!: number;

@ApiProperty()@IsISO8601()
createdAt!: Date;

@ApiProperty()@IsISO8601()
updatedAt!: Date;

@ApiProperty({"required":false})@IsOptional()@IsBoolean()
published?: boolean;

@ApiProperty({"required":false})@IsOptional()@IsBoolean()
isPublic?: boolean;

@ApiProperty({"required":false})@IsOptional()@IsInt()@()
isDeleted?: number;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
isDeletedDT?: Date;

@ApiProperty()@IsString()@()
email!: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
lastName?: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
firstName?: string;

@ApiProperty({"required":false})@IsOptional()@IsDefined()
title?: unknown;

@ApiProperty({"required":false})@IsOptional()@IsString()
nickName?: string;

@ApiProperty({"required":false})@IsOptional()@IsDefined()
Gender?: unknown;

@ApiProperty({"required":false})@IsOptional()@IsObject()
social?: object;

@ApiProperty({"required":false})@IsOptional()@IsDefined()
Language?: unknown;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
dob?: Date;

@ApiProperty({"required":false})@IsOptional()@IsObject()
address?: object;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
isValidated?: Date;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
isSuspended?: Date;

@ApiProperty()@IsDefined()
Orgs!: unknown;

@ApiProperty({"required":false})@IsOptional()@IsDefined()
manager?: unknown;

@ApiProperty({"required":false})@IsOptional()@IsString()
managerId?: string;

@ApiProperty()@IsDefined()
Team!: unknown;

@ApiProperty()@IsDefined()
Profiles!: unknown;

@ApiProperty()@IsDefined()
Groups!: unknown;

@ApiProperty()@IsDefined()
Posts!: unknown;

@ApiProperty()@IsDefined()
Comments!: unknown;

@ApiProperty()@IsDefined()
Stories!: unknown;

@ApiProperty()@IsDefined()
Todo!: unknown;

@ApiProperty()@IsDefined()
TodosAuthor!: unknown;

@ApiProperty()@IsDefined()
Tasks!: unknown;

@ApiProperty()@IsDefined()
TasksAuthor!: unknown;

@ApiProperty()@IsDefined()
Files!: unknown;

@ApiProperty()@IsDefined()
ChangesLogs!: unknown;

@ApiProperty()@IsDefined()
Roles!: unknown;

@ApiProperty()@IsDefined()
Permissions!: unknown;

@ApiProperty()@IsDefined()
Tokens!: unknown;

@ApiProperty()@IsDefined()
ApiKeys!: unknown;

@ApiProperty()@IsBoolean()
isTfaEnable!: boolean;

@ApiProperty({"required":false})@IsOptional()@IsString()
tfaSecret?: string;

@ApiProperty({"required":false})@IsOptional()@IsDefined()
userSecret?: unknown;

@ApiProperty()@IsDefined()
followers!: unknown;

@ApiProperty()@IsDefined()
followings!: unknown;

@ApiProperty()@IsDefined()
posts_liked!: unknown;

@ApiProperty({"required":false})@IsOptional()@IsString()
passWordFaker?: string;

}


export class CreateUserInput extends OmitType(UserInput, [] as const) {}


export class UpdateUserInput extends PartialType(CreateUserInput) {}

