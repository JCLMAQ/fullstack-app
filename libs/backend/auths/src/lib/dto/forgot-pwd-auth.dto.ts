import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from "class-validator";

export class ForgotAuth {
  @ApiProperty({ description: 'Email address', example: 'user@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string | undefined;

  @ApiProperty({ description: 'New password', example: 'newStrongPassword123!' })
  @IsString({ message: 'New password must be a string' })
  newPassword: string | undefined;

  @ApiProperty({ description: 'Password confirmation', example: 'newStrongPassword123!' })
  @IsString({ message: 'Password verification must be a string' })
  verifyPassword: string | undefined;
}
