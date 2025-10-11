import { ApiProperty } from "@nestjs/swagger";
import { Group, Task, TaskState, Todo, User, UserTaskLink } from '@prisma/prisma-client';
import { UserEntity } from "@be/users";

export class TaskEntity implements Task {

  constructor(partial: Partial<TaskEntity>) {
    Object.assign(this, partial);
  }

  // Propriétés requises par l'interface Task de Prisma
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
  orderTask!: number;
  title!: string;
  content!: string | null;
  taskState!: TaskState;
  mainTaskId!: string | null;
  todoId!: string | null;
  
  // Relations optionnelles
  @ApiProperty({ type: () => UserEntity })
  owner?: User;
  
  @ApiProperty({ type: () => TaskEntity })
  mainTask?: Task | null;
  
  @ApiProperty({ type: () => [TaskEntity] })
  SubTasks?: Task[];
  
  @ApiProperty({ type: () => [UserEntity] })
  groups?: Group[];
  
  @ApiProperty({ type: () => [UserEntity] })
  Users?: UserTaskLink[];
  
  todo?: Todo;
}