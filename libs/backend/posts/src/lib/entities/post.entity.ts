import { UserEntity } from "@be/users";
import { ApiProperty } from "@nestjs/swagger";
import { Category, Comment, Post, User } from '@prisma/prisma-client';

export class PostEntity implements Post {

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }

  // Propriétés requises par l'interface Post de Prisma
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
  orderPost!: number | null;
  title!: string;
  content!: string | null;
  authorId!: string;
  
  // Relations optionnelles
  @ApiProperty({ type: () => UserEntity })
  author?: User;
  
  @ApiProperty({ type: () => UserEntity })
  Category?: Category[];
  Comment?: Comment[];
}
