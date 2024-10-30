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
import { Prisma, UserTodoLink } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class UserTodoLinkCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UserTodoLinkFindManyArgs,
  ): Promise<Result<PaginationModel<UserTodoLink>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.userTodoLink.findMany(filter),
        this.prismaService.userTodoLink.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get UserTodoLink Resources.`));
    }
  }

  async getById(id: string): Promise<Result<UserTodoLink, Error>> {
    try {
      const result = await this.prismaService.userTodoLink.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`UserTodoLink Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UserTodoLinkCreateInput): Promise<Result<UserTodoLink, Error>> {
    try {
      const result = await this.prismaService.userTodoLink.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create UserTodoLink Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.UserTodoLinkUpdateInput,
  ): Promise<Result<UserTodoLink, Error>> {
    try {
      const result = await this.prismaService.userTodoLink.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update UserTodoLink Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<UserTodoLink, Error>> {
    try {
      const result = await this.prismaService.userTodoLink.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete UserTodoLink Resource ${id}.`,
      ));
    }
  }
}
