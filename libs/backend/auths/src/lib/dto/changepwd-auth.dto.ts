import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from "class-validator";

export class ChangePwdDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    description: 'Current password',
    example: 'currentPassword123'
  })
  @IsString()
  @MinLength(6, { message: 'Current password must be at least 6 characters long' })
  oldPassword!: string;

  @ApiProperty({
    description: 'New password',
    example: 'newSecurePassword456',
    minLength: 6
  })
  @IsString()
  @MinLength(6, { message: 'New password must be at least 6 characters long' })
  newPassword!: string;

  @ApiProperty({
    description: 'New password confirmation',
    example: 'newSecurePassword456'
  })
  @IsString()
  @MinLength(6, { message: 'Password confirmation must be at least 6 characters long' })
  verifyPassword!: string;
}
