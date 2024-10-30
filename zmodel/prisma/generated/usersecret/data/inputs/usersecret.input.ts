/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';
import {IsISO8601} from 'class-validator';
import {IsDefined} from 'class-validator';
import {IsString} from 'class-validator';
import {IsOptional} from 'class-validator';
import {} from 'class-validator';
import {IsBoolean} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class UserSecretInput  {
  
@ApiProperty()@IsInt()
id!: number;

@ApiProperty()@IsISO8601()
createdAt!: Date;

@ApiProperty()@IsISO8601()
updatedAt!: Date;

@ApiProperty()@IsDefined()
user!: unknown;

@ApiProperty()@IsString()
userId!: string;

@ApiProperty({"required":false})@IsOptional()@IsString()@()@()
pwdHash?: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
salt?: string;

@ApiProperty({"required":false})@IsOptional()@IsBoolean()
isAdmin?: boolean;

}


export class CreateUserSecretInput extends OmitType(UserSecretInput, [] as const) {}


export class UpdateUserSecretInput extends PartialType(CreateUserSecretInput) {}

