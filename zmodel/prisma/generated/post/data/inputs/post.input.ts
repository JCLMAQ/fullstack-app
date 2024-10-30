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


export class PostInput  {
  
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

@ApiProperty({"required":false})@IsOptional()@IsInt()
orderPost?: number;

@ApiProperty()@IsString()
title!: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
content?: string;

@ApiProperty()@IsDefined()
Categories!: unknown;

@ApiProperty()@IsDefined()
Comments!: unknown;

@ApiProperty()@IsDefined()
LikedBys!: unknown;

}


export class CreatePostInput extends OmitType(PostInput, [] as const) {}


export class UpdatePostInput extends PartialType(CreatePostInput) {}

