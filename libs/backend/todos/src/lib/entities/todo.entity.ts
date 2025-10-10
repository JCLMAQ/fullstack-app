import { UserEntity } from '@be/users';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Group, Organization, Task, Todo, TodoState, User, UserTodoLink } from '@prisma/prisma-client';
import { Exclude } from 'class-transformer';

export class TodoEntity implements Todo {
  constructor(partial: Partial<TodoEntity>) {
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

  // Todo specific fields
  @ApiProperty()
  orderTodo!: number;

  @ApiProperty()
  title!: string;

  @ApiProperty({ required: false })
  content!: string | null;

  @ApiProperty({ enum: TodoState })
  todoState!: TodoState;

  @ApiProperty({ required: false })
  mainTodoId!: string | null;

  @ApiProperty({ type: () => TodoEntity })
  mainTodo?: Todo | null;

  @ApiProperty({ type: () => TodoEntity, isArray: true })
  SubTodos?: Todo[];

  @ApiProperty({ type: () => UserTodoLinkEntity, isArray: true })
  Users?: UserTodoLink[];

  @ApiProperty({ isArray: true })
  Tasks?: Task[];
}

export class UserTodoLinkEntity implements UserTodoLink {
  @ApiProperty()
  userId!: string;

  @ApiProperty({ type: () => UserEntity })
  user?: User;

  @ApiProperty()
  todoId!: string;

  @ApiProperty({ type: () => TodoEntity })
  todo?: Todo;

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
