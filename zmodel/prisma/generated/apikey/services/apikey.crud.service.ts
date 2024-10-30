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
import { Prisma, ApiKey } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class ApiKeyCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ApiKeyFindManyArgs,
  ): Promise<Result<PaginationModel<ApiKey>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.apiKey.findMany(filter),
        this.prismaService.apiKey.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get ApiKey Resources.`));
    }
  }

  async getById(id: string): Promise<Result<ApiKey, Error>> {
    try {
      const result = await this.prismaService.apiKey.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`ApiKey Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ApiKeyCreateInput): Promise<Result<ApiKey, Error>> {
    try {
      const result = await this.prismaService.apiKey.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create ApiKey Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.ApiKeyUpdateInput,
  ): Promise<Result<ApiKey, Error>> {
    try {
      const result = await this.prismaService.apiKey.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update ApiKey Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<ApiKey, Error>> {
    try {
      const result = await this.prismaService.apiKey.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete ApiKey Resource ${id}.`,
      ));
    }
  }
}
