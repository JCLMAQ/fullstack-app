import { UserEntity } from "@be/users";
import { ApiProperty } from "@nestjs/swagger";
import { Group, Task, Todo, TodoState, User, UserTodoLink } from '@prisma/prisma';

export class TodoEntity implements Todo {

  constructor(partial: Partial<TodoEntity>) {
    Object.assign(this, partial);
  }

  // Propriétés requises par l'interface Todo de Prisma
  id!: string;
  numSeq!: number;
  createdAt!: Date;
  updatedAt!: Date;
  published!: boolean;
  isDeleted!: number;
  isDeletedDT!: Date | null;
  isPublic!: boolean;
  ownerId!: string;
  orgId!: string;
  orderTodo!: number;
  title!: string;
  content!: string | null;
  todoState!: TodoState;
  mainTodoId!: string | null;

  // Relations optionnelles
  @ApiProperty({ type: () => UserEntity })
  owner?: User;

  @ApiProperty({ type: () => TodoEntity })
  mainTodo?: Todo | null;

  @ApiProperty({ type: () => [TodoEntity] })
  SubTodos?: Todo[];

  @ApiProperty({ type: () => [UserEntity] })
  groups?: Group[];

  @ApiProperty({ type: () => [UserEntity] })
  Users?: UserTodoLink[];

  @ApiProperty({ type: () => [UserEntity] })
  Tasks?: Task[];
}
