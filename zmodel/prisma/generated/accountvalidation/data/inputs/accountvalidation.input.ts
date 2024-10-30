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
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class AccountValidationInput  {
  
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

@ApiProperty()@IsBoolean()
isValidated!: boolean;

@ApiProperty()@IsString()
emailToken!: string;

@ApiProperty()@IsISO8601()
timeStamp!: Date;

}


export class CreateAccountValidationInput extends OmitType(AccountValidationInput, [] as const) {}


export class UpdateAccountValidationInput extends PartialType(CreateAccountValidationInput) {}

