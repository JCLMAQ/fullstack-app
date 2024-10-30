/*
-----------------------------------------------------
THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
-----------------------------------------------------
*/

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Comment } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class CommentCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.CommentFindManyArgs,
  ): Promise<Result<PaginationModel<Comment>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.comment.findMany(filter),
        this.prismaService.comment.count({ where: filter?.where }),
      ]);

      const take = filter?.take ? filter?.take : count;
      const skip = filter?.skip ? filter?.skip : 0;

      return ok({
        items: items,
        meta: {
          totalItems: count,
          items: items.length,
          totalPages: Math.ceil(count / take),
          page: skip / take + 1,
        },
      });
    }
    catch(e) {
      return err(new InternalServerErrorException(`Could not get Comment Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Comment, Error>> {
    try {
      const result = await this.prismaService.comment.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Comment Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.CommentCreateInput): Promise<Result<Comment, Error>> {
    try {
      const result = await this.prismaService.comment.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Comment Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.CommentUpdateInput,
  ): Promise<Result<Comment, Error>> {
    try {
      const result = await this.prismaService.comment.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Comment Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Comment, Error>> {
    try {
      const result = await this.prismaService.comment.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Comment Resource ${id}.`,
      ));
    }
  }
}
