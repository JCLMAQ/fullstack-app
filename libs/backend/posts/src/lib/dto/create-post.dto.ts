import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiPropertyOptional({
    description: 'Order of the post',
    example: 1,
    minimum: 0
  })
  @IsOptional()
  @IsNumber({}, { message: 'Order must be a valid number' })
  @Min(0, { message: 'Order must be greater than or equal to 0' })
  orderPost?: number;

  @ApiProperty({
    description: 'Post title',
    example: 'My First Blog Post',
    minLength: 3,
    maxLength: 200
  })
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title!: string;

  @ApiPropertyOptional({
    description: 'Post content',
    example: 'This is the content of my first blog post...',
    maxLength: 10000
  })
  @IsOptional()
  @IsString()
  @MaxLength(10000, { message: 'Content must not exceed 10000 characters' })
  content?: string;

  @ApiPropertyOptional({
    description: 'Soft delete date',
    example: '2023-12-01T00:00:00Z'
  })
  @IsOptional()
  @IsDate({ message: 'Invalid date format' })
  @Type(() => Date)
  isDeleted?: Date;
}
