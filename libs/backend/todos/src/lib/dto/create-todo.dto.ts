import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TodoState } from '@prisma/prisma-client';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Order of the todo',
    example: 1
  })
  @IsNumber()
  orderTodo!: number;

  @ApiProperty({
    description: 'Title of the todo',
    example: 'Setup development environment'
  })
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    description: 'Content/description of the todo',
    example: 'Install Node.js, Docker, and configure the development database'
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Todo state',
    enum: TodoState,
    default: TodoState.CREATION
  })
  @IsOptional()
  @IsEnum(TodoState)
  todoState?: TodoState;

  @ApiProperty({
    description: 'Organization ID',
    example: 'org_123456'
  })
  @IsUUID()
  orgId!: string;

  @ApiPropertyOptional({
    description: 'Main todo ID for subtodo',
    example: 'todo_123456'
  })
  @IsOptional()
  @IsUUID()
  mainTodoId?: string;
}

export class CreateUserTodoLinkDto {
  @ApiProperty({
    description: 'User ID',
    example: 'user_123456'
  })
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    description: 'Is the user the author of the todo',
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isAuthor?: boolean;

  @ApiPropertyOptional({
    description: 'Is the user assigned to the todo',
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isAssigned?: boolean;

  @ApiPropertyOptional({
    description: 'Comment about the user-todo relationship',
    example: 'Project lead for this todo'
  })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class CreateTodoWithUsersDto extends CreateTodoDto {
  @ApiProperty({
    description: 'Users to link with the todo',
    type: [CreateUserTodoLinkDto]
  })
  users!: CreateUserTodoLinkDto[];
}
