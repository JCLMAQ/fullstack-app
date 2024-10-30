/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {IsDefined} from 'class-validator';
import {IsISO8601} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class UserFollowerInput  {
  
@ApiProperty()@IsString()
user_id!: string;

@ApiProperty()@IsDefined()
user!: unknown;

@ApiProperty()@IsString()
follower_id!: string;

@ApiProperty()@IsDefined()
follower!: unknown;

@ApiProperty()@IsISO8601()
createdAt!: Date;

@ApiProperty()@IsISO8601()
updatedAt!: Date;

}


export class CreateUserFollowerInput extends OmitType(UserFollowerInput, [] as const) {}


export class UpdateUserFollowerInput extends PartialType(CreateUserFollowerInput) {}

