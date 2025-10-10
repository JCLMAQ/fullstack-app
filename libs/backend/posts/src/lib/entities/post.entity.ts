import { UserEntity } from "@be/users";
import { ApiProperty } from "@nestjs/swagger";
import { Category, User } from '@prisma/prisma-client';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class PostEntity {
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @Type(() => Date)
  createdAt!: Date;

  @ApiProperty()
  @Type(() => Date)
  updatedAt!: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  orderPost!: number | null;

  @ApiProperty()
  @IsBoolean()
  published!: boolean;

  @ApiProperty()
  @IsString()
  title!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  content!: string | null;

  @ApiProperty({ type: () => UserEntity })
  author?: User;

  @ApiProperty()
  @IsUUID()
  authorId!: string;

  @ApiProperty({ type: () => UserEntity })
  Category?: Category[];

  Comment?: Comment[];

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  isDeletedDT!: Date | null;

  @ApiProperty()
  @IsNumber()
  isDeleted!: number;
}
