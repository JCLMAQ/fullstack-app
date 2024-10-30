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
import {IsObject} from 'class-validator';
import {IsDefined} from 'class-validator';
import {OmitType} from '@nestjs/swagger';
import {PartialType} from '@nestjs/swagger';


export class OrganizationInput  {
  
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

@ApiProperty()@IsString()
name!: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
description?: string;

@ApiProperty({"required":false})@IsOptional()@IsObject()
address?: object;

@ApiProperty()@IsString()@()
emailITAdmin!: string;

@ApiProperty({"required":false})@IsOptional()@IsString()
webSite?: string;

@ApiProperty()@IsDefined()
OrgEmails!: unknown;

@ApiProperty()@IsDefined()
OrgDomains!: unknown;

@ApiProperty({"required":false})@IsOptional()@IsDefined()
mainOrg?: unknown;

@ApiProperty({"required":false})@IsOptional()@IsString()
mainOrgId?: string;

@ApiProperty()@IsDefined()
OrgEntity!: unknown;

@ApiProperty()@IsDefined()
Members!: unknown;

@ApiProperty()@IsDefined()
Posts!: unknown;

@ApiProperty()@IsDefined()
Groups!: unknown;

@ApiProperty()@IsDefined()
Files!: unknown;

@ApiProperty()@IsDefined()
Tasks!: unknown;

@ApiProperty()@IsDefined()
Todos!: unknown;

}


export class CreateOrganizationInput extends OmitType(OrganizationInput, [] as const) {}


export class UpdateOrganizationInput extends PartialType(CreateOrganizationInput) {}

