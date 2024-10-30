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
import {IsDefined} from 'class-validator';
import {IsString} from 'class-validator';
import {IsObject} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class ChangesTrackingInput  {
  
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

@ApiProperty()@IsISO8601()
doneAt!: Date;

@ApiProperty()@IsDefined()
modifiedBy!: unknown;

@ApiProperty()@IsString()
modifiedById!: string;

@ApiProperty()@IsString()
modelName!: string;

@ApiProperty()@IsString()
recordId!: string;

@ApiProperty()@IsString()
operation!: string;

@ApiProperty()@IsObject()
newData!: object;

@ApiProperty()@IsObject()
oldData!: object;

}


export class CreateChangesTrackingInput extends OmitType(ChangesTrackingInput, [] as const) {}


export class UpdateChangesTrackingInput extends PartialType(CreateChangesTrackingInput) {}

