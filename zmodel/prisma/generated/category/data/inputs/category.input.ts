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
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class CategoryInput  {
  
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

@ApiProperty()@IsInt()
orderCategory!: number;

@ApiProperty()@IsString()
name!: string;

@ApiProperty()@IsDefined()
Posts!: unknown;

}


export class CreateCategoryInput extends OmitType(CategoryInput, [] as const) {}


export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {}

