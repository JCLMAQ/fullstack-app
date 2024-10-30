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


export class PostLikeInput  {
  
@ApiProperty()@IsString()
user_id!: string;

@ApiProperty()@IsDefined()
user!: unknown;

@ApiProperty()@IsString()
post_id!: string;

@ApiProperty()@IsDefined()
post!: unknown;

@ApiProperty()@IsISO8601()
createdAt!: Date;

@ApiProperty()@IsISO8601()
updatedAt!: Date;

}


export class CreatePostLikeInput extends OmitType(PostLikeInput, [] as const) {}


export class UpdatePostLikeInput extends PartialType(CreatePostLikeInput) {}

