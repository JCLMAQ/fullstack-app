import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskState } from '@prisma/prisma';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Order of the task',
    example: 1
  })
  @IsNumber()
  orderTask!: number;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation'
  })
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    description: 'Content/description of the task',
    example: 'Write comprehensive documentation for the API endpoints'
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({
    description: 'Task state',
    enum: TaskState,
    default: TaskState.CREATION
  })
  @IsOptional()
  @IsEnum(TaskState)
  taskState?: TaskState;

  @ApiProperty({
    description: 'Organization ID',
    example: 'org_123456'
  })
  @IsUUID()
  orgId!: string;

  @ApiPropertyOptional({
    description: 'Main task ID for subtask',
    example: 'task_123456'
  })
  @IsOptional()
  @IsUUID()
  mainTaskId?: string;

  @ApiPropertyOptional({
    description: 'Todo ID if task is linked to a todo',
    example: 'todo_123456'
  })
  @IsOptional()
  @IsUUID()
  todoId?: string;
}

export class CreateUserTaskLinkDto {
  @ApiProperty({
    description: 'User ID',
    example: 'user_123456'
  })
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({
    description: 'Is the user the author of the task',
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isAuthor?: boolean;

  @ApiPropertyOptional({
    description: 'Is the user assigned to the task',
    default: true
  })
  @IsOptional()
  @IsBoolean()
  isAssigned?: boolean;

  @ApiPropertyOptional({
    description: 'Comment about the user-task relationship',
    example: 'Main developer for this task'
  })
  @IsOptional()
  @IsString()
  comment?: string;
}

export class CreateTaskWithUsersDto extends CreateTaskDto {
  @ApiProperty({
    description: 'Users to link with the task',
    type: [CreateUserTaskLinkDto]
  })
  users!: CreateUserTaskLinkDto[];
}
