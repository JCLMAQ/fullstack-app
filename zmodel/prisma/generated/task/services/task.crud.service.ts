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
import { Prisma, Task } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class TaskCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.TaskFindManyArgs,
  ): Promise<Result<PaginationModel<Task>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.task.findMany(filter),
        this.prismaService.task.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Task Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Task, Error>> {
    try {
      const result = await this.prismaService.task.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Task Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.TaskCreateInput): Promise<Result<Task, Error>> {
    try {
      const result = await this.prismaService.task.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Task Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.TaskUpdateInput,
  ): Promise<Result<Task, Error>> {
    try {
      const result = await this.prismaService.task.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Task Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Task, Error>> {
    try {
      const result = await this.prismaService.task.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Task Resource ${id}.`,
      ));
    }
  }
}
