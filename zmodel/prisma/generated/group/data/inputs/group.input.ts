/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {ApiProperty} from '@nestjs/swagger';
import {IsInt} from 'class-validator';
import {IsISO8601} from 'class-validator';
import {IsBoolean} from 'class-validator';
import {} from 'class-validator';
import {IsOptional} from 'class-validator';
import {IsString} from 'class-validator';
import {IsDefined} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class GroupInput  {
  
@ApiProperty()@IsInt()
id!: number;

@ApiProperty()@IsISO8601()
createdAt!: Date;

@ApiProperty()@IsISO8601()
updatedAt!: Date;

@ApiProperty()@IsBoolean()
published!: boolean;

@ApiProperty()@IsBoolean()
isPublic!: boolean;

@ApiProperty()@IsInt()@()
isDeleted!: number;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
isDeletedDT?: Date;

@ApiProperty()@IsInt()
orderGroup!: number;

@ApiProperty()@IsString()
name!: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
description?: string;

@ApiProperty({"required":false})@IsOptional()@IsISO8601()
isActiv?: Date;

@ApiProperty()@IsDefined()
Users!: unknown;

@ApiProperty()@IsDefined()
Tasks!: unknown;

@ApiProperty()@IsDefined()
Todos!: unknown;

@ApiProperty()@IsDefined()
Posts!: unknown;

@ApiProperty()@IsDefined()
Files!: unknown;

@ApiProperty()@IsDefined()
org!: unknown;

@ApiProperty()@IsString()
orgId!: string;

}


export class CreateGroupInput extends OmitType(GroupInput, [] as const) {}


export class UpdateGroupInput extends PartialType(CreateGroupInput) {}

