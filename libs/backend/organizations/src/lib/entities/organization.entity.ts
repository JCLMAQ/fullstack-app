import { ApiProperty } from '@nestjs/swagger';
import { File, Group, Organization, OrgDomain, OrgEmail, Post, Prisma, Task, Todo, User } from '@prisma/prisma-client';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsEmail,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID
} from 'class-validator';

export class OrganizationEntity implements Organization {
  constructor(partial: Partial<OrganizationEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ description: 'Unique identifier for the organization' })
  @IsUUID()
  id!: string;

  @ApiProperty({ description: 'Sequential number for the organization' })
  @IsNumber()
  @IsInt()
  numSeq!: number;

  @ApiProperty({ description: 'Creation timestamp' })
  @Type(() => Date)
  createdAt!: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  @Type(() => Date)
  updatedAt!: Date;

  @ApiProperty({ description: 'Publication status', required: false })
  @IsOptional()
  @IsBoolean()
  published!: boolean | null;

  @ApiProperty({ description: 'Public visibility status', required: false })
  @IsOptional()
  @IsBoolean()
  isPublic!: boolean | null;

  @ApiProperty({ description: 'Deletion status (0=active, 1=deleted)', required: false })
  @IsOptional()
  @IsNumber()
  @IsInt()
  isDeleted!: number | null;

  @ApiProperty({ description: 'Deletion timestamp', required: false })
  @IsOptional()
  @Type(() => Date)
  isDeletedDT!: Date | null;

  @ApiProperty({ description: 'Organization name' })
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Organization description', required: false })
  @IsOptional()
  @IsString()
  description!: string | null;

  @ApiProperty({ description: 'Organization address in JSON format', required: false })
  @IsOptional()
  address!: Prisma.JsonValue;

  @ApiProperty({ description: 'IT Administrator email address' })
  @IsEmail()
  emailITAdmin!: string;

  @ApiProperty({ description: 'Organization website URL', required: false })
  @IsOptional()
  @IsUrl()
  webSite!: string | null;

  @ApiProperty({ description: 'Parent organization ID', required: false })
  @IsOptional()
  @IsUUID()
  mainOrgId!: string | null;

  // Relations (optional for API responses)
  @ApiProperty({ description: 'Organization emails', required: false, type: 'array' })
  OrgEmails?: OrgEmail[];

  @ApiProperty({ description: 'Organization domains', required: false, type: 'array' })
  OrgDomains?: OrgDomain[];

  @ApiProperty({ description: 'Parent organization', required: false })
  mainOrg?: Organization | null;

  @ApiProperty({ description: 'Child organizations', required: false, type: 'array' })
  OrgEntity?: Organization[];

  @ApiProperty({ description: 'Organization members', required: false, type: 'array' })
  Members?: User[];

  @ApiProperty({ description: 'Organization posts', required: false, type: 'array' })
  Posts?: Post[];

  @ApiProperty({ description: 'Organization groups', required: false, type: 'array' })
  Groups?: Group[];

  @ApiProperty({ description: 'Organization files', required: false, type: 'array' })
  Files?: File[];

  @ApiProperty({ description: 'Organization tasks', required: false, type: 'array' })
  Tasks?: Task[];

  @ApiProperty({ description: 'Organization todos', required: false, type: 'array' })
  Todos?: Todo[];
}
