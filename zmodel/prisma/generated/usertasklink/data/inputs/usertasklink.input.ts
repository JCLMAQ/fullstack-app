/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {ApiProperty} from '@nestjs/swagger';
import {IsDefined} from 'class-validator';
import {IsString} from 'class-validator';
import {IsBoolean} from 'class-validator';
import {IsISO8601} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class UserTaskLinkInput  {
  
@ApiProperty()@IsDefined()
user!: unknown;

@ApiProperty()@IsString()
userId!: string;

@ApiProperty()@IsDefined()
task!: unknown;

@ApiProperty()@IsString()
taskId!: string;

@ApiProperty()@IsBoolean()
isAuthor!: boolean;

@ApiProperty()@IsBoolean()
isAssigned!: boolean;

@ApiProperty()@IsISO8601()
createdAt!: Date;

@ApiProperty()@IsISO8601()
updatedAt!: Date;

@ApiProperty()@IsString()
comment!: string;

}


export class CreateUserTaskLinkInput extends OmitType(UserTaskLinkInput, [] as const) {}


export class UpdateUserTaskLinkInput extends PartialType(CreateUserTaskLinkInput) {}

