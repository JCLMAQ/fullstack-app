
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/prisma-client';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { AuthDto } from "./auth.dto";

export class LoginAuthDto extends AuthDto {
  // Inherits email and password validation from AuthDto
}

export class LoginResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  @IsString()
  access_token!: string;

  @ApiPropertyOptional({
    description: 'User full name',
    example: 'John Doe'
  })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiPropertyOptional({
    description: 'User roles',
    type: [String],
    enum: Role,
    isArray: true
  })
  @IsOptional()
  @IsArray()
  roles?: Role[];
}
