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
import { Prisma, Scope } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class ScopeCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ScopeFindManyArgs,
  ): Promise<Result<PaginationModel<Scope>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.scope.findMany(filter),
        this.prismaService.scope.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Scope Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Scope, Error>> {
    try {
      const result = await this.prismaService.scope.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Scope Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ScopeCreateInput): Promise<Result<Scope, Error>> {
    try {
      const result = await this.prismaService.scope.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Scope Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.ScopeUpdateInput,
  ): Promise<Result<Scope, Error>> {
    try {
      const result = await this.prismaService.scope.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Scope Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Scope, Error>> {
    try {
      const result = await this.prismaService.scope.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Scope Resource ${id}.`,
      ));
    }
  }
}
