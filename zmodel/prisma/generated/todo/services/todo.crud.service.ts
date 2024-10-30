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
import { Prisma, Todo } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class TodoCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.TodoFindManyArgs,
  ): Promise<Result<PaginationModel<Todo>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.todo.findMany(filter),
        this.prismaService.todo.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Todo Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Todo, Error>> {
    try {
      const result = await this.prismaService.todo.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Todo Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.TodoCreateInput): Promise<Result<Todo, Error>> {
    try {
      const result = await this.prismaService.todo.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Todo Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.TodoUpdateInput,
  ): Promise<Result<Todo, Error>> {
    try {
      const result = await this.prismaService.todo.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Todo Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Todo, Error>> {
    try {
      const result = await this.prismaService.todo.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Todo Resource ${id}.`,
      ));
    }
  }
}
