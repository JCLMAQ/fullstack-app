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
import { Prisma, AppEmailDomain } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class AppEmailDomainCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.AppEmailDomainFindManyArgs,
  ): Promise<Result<PaginationModel<AppEmailDomain>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.appEmailDomain.findMany(filter),
        this.prismaService.appEmailDomain.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get AppEmailDomain Resources.`));
    }
  }

  async getById(id: string): Promise<Result<AppEmailDomain, Error>> {
    try {
      const result = await this.prismaService.appEmailDomain.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`AppEmailDomain Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.AppEmailDomainCreateInput): Promise<Result<AppEmailDomain, Error>> {
    try {
      const result = await this.prismaService.appEmailDomain.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create AppEmailDomain Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.AppEmailDomainUpdateInput,
  ): Promise<Result<AppEmailDomain, Error>> {
    try {
      const result = await this.prismaService.appEmailDomain.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update AppEmailDomain Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<AppEmailDomain, Error>> {
    try {
      const result = await this.prismaService.appEmailDomain.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete AppEmailDomain Resource ${id}.`,
      ));
    }
  }
}
