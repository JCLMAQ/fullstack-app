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
import { Prisma, UserTaskLink } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class UserTaskLinkCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.UserTaskLinkFindManyArgs,
  ): Promise<Result<PaginationModel<UserTaskLink>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.userTaskLink.findMany(filter),
        this.prismaService.userTaskLink.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get UserTaskLink Resources.`));
    }
  }

  async getById(id: string): Promise<Result<UserTaskLink, Error>> {
    try {
      const result = await this.prismaService.userTaskLink.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`UserTaskLink Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.UserTaskLinkCreateInput): Promise<Result<UserTaskLink, Error>> {
    try {
      const result = await this.prismaService.userTaskLink.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create UserTaskLink Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.UserTaskLinkUpdateInput,
  ): Promise<Result<UserTaskLink, Error>> {
    try {
      const result = await this.prismaService.userTaskLink.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update UserTaskLink Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<UserTaskLink, Error>> {
    try {
      const result = await this.prismaService.userTaskLink.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete UserTaskLink Resource ${id}.`,
      ));
    }
  }
}
