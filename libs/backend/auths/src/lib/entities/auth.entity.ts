import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class AuthEntity {
    @ApiProperty({ description: 'Email address', example: 'user@example.com' })
    @IsOptional()
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string | undefined;

    @ApiProperty({ description: 'Password', example: 'strongPassword123!' })
    @IsOptional()
    @IsString({ message: 'Password must be a string' })
    password: string | undefined;
}
