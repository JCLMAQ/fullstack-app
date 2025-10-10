import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from "class-validator";

export class ForgotEmailAuthDto {
  @ApiProperty({ description: 'Email address for password reset', example: 'user@example.com' })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;
}
