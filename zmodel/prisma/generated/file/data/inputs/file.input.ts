/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {IsInt} from 'class-validator';
import {IsISO8601} from 'class-validator';
import {IsBoolean} from 'class-validator';
import {} from 'class-validator';
import {IsOptional} from 'class-validator';
import {IsDefined} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class FileInput  {
  
@ApiProperty()@IsString()
id!: string;

@ApiProperty()@IsInt()
numSeq!: number;

@ApiProperty()@IsISO8601()
createdAt!: Date;

@ApiProperty()@IsISO8601()
updatedAt!: Date;

@ApiProperty()@IsBoolean()
published!: boolean;

@ApiProperty()@IsInt()@()
isDeleted!: number;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
isDeletedDT?: Date;

@ApiProperty()@IsBoolean()
isPublic!: boolean;

@ApiProperty()@IsDefined()
owner!: unknown;

@ApiProperty()@IsString()
ownerId!: string;

@ApiProperty()@IsDefined()
org!: unknown;

@ApiProperty()@IsString()
orgId!: string;

@ApiProperty()@IsDefined()
groups!: unknown;

@ApiProperty()@IsString()
name!: string;

@ApiProperty()@IsString()
storageName!: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
type?: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
data?: string;

@ApiProperty({"required":false})@IsOptional()@IsInt()
size?: number;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
isArchived?: Date;

}


export class CreateFileInput extends OmitType(FileInput, [] as const) {}


export class UpdateFileInput extends PartialType(CreateFileInput) {}

