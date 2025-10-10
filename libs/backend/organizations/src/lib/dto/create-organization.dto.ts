import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEmail,
    IsOptional,
    IsString,
    IsUrl,
    IsUUID,
    MaxLength,
    MinLength
} from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Name of the organization',
    example: 'Acme Corporation',
    minLength: 2,
    maxLength: 100
  })
  @IsString({ message: 'Organization name must be a string' })
  @MinLength(2, { message: 'Organization name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Organization name must not exceed 100 characters' })
  name!: string;

  @ApiProperty({
    description: 'Description of the organization',
    example: 'Leading technology company specializing in innovative solutions',
    required: false,
    maxLength: 500
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @ApiProperty({
    description: 'Organization address in JSON format',
    example: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    required: false
  })
  @IsOptional()
  address?: Record<string, unknown>;

  @ApiProperty({
    description: 'IT Administrator email address',
    example: 'admin@acme.com'
  })
  @IsEmail({}, { message: 'Please provide a valid IT administrator email address' })
  emailITAdmin!: string;

  @ApiProperty({
    description: 'Organization website URL',
    example: 'https://www.acme.com',
    required: false
  })
  @IsOptional()
  @IsUrl({}, { message: 'Please provide a valid website URL' })
  webSite?: string;

  @ApiProperty({
    description: 'Whether the organization is published',
    example: true,
    required: false,
    default: false
  })
  @IsOptional()
  @IsBoolean({ message: 'Published must be a boolean value' })
  published?: boolean;

  @ApiProperty({
    description: 'Whether the organization is public',
    example: true,
    required: false,
    default: true
  })
  @IsOptional()
  @IsBoolean({ message: 'IsPublic must be a boolean value' })
  isPublic?: boolean;

  @ApiProperty({
    description: 'Parent organization ID for hierarchical structure',
    example: 'uuid-of-parent-org',
    required: false
  })
  @IsOptional()
  @IsUUID(undefined, { message: 'Main organization ID must be a valid UUID' })
  mainOrgId?: string;
}
