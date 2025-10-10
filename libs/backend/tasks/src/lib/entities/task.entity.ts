import { UserEntity } from '@be/users';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Group, Organization, Task, TaskState, Todo, User, UserTaskLink } from '@prisma/prisma-client';
import { Exclude } from 'class-transformer';

export class TaskEntity implements Task {
  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }

  // Base fields from organizationBaseEntity
  @ApiProperty()
  id!: string;

  @ApiProperty()
  numSeq!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  published!: boolean;

  @ApiHideProperty()
  @Exclude()
  isDeleted!: number;

  @ApiProperty({ required: false })
  isDeletedDT!: Date | null;

  @ApiProperty()
  isPublic!: boolean;

  @ApiProperty()
  ownerId!: string;

  @ApiProperty({ type: () => UserEntity })
  owner?: User;

  @ApiProperty()
  orgId!: string;

  @ApiProperty()
  org?: Organization;

  @ApiProperty({ isArray: true })
  groups?: Group[];

  // Task specific fields
  @ApiProperty()
  orderTask!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty({ required: false })
  content!: string | null;

  @ApiProperty({ enum: TaskState })
  taskState!: TaskState;

  @ApiProperty({ required: false })
  mainTaskId!: string | null;

  @ApiProperty({ type: () => TaskEntity })
  mainTask?: Task | null;

  @ApiProperty({ type: () => TaskEntity, isArray: true })
  SubTasks?: Task[];

  @ApiProperty({ type: () => UserTaskLinkEntity, isArray: true })
  Users?: UserTaskLink[];

  @ApiProperty({ required: false })
  todoId!: string | null;

  @ApiProperty()
  todo?: Todo | null;
}

export class UserTaskLinkEntity implements UserTaskLink {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: () => UserEntity })
  user?: User;

  @ApiProperty()
  taskId!: string;

  @ApiProperty({ type: () => TaskEntity })
  task?: Task;

  @ApiProperty()
  isAuthor!: boolean;

  @ApiProperty()
  isAssigned!: boolean;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;

  @ApiProperty()
  comment!: string;
}
