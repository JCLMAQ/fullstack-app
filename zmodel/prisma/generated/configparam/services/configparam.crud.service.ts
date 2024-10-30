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
import { Prisma, ConfigParam } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class ConfigParamCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ConfigParamFindManyArgs,
  ): Promise<Result<PaginationModel<ConfigParam>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.configParam.findMany(filter),
        this.prismaService.configParam.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get ConfigParam Resources.`));
    }
  }

  async getById(id: string): Promise<Result<ConfigParam, Error>> {
    try {
      const result = await this.prismaService.configParam.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`ConfigParam Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ConfigParamCreateInput): Promise<Result<ConfigParam, Error>> {
    try {
      const result = await this.prismaService.configParam.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create ConfigParam Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.ConfigParamUpdateInput,
  ): Promise<Result<ConfigParam, Error>> {
    try {
      const result = await this.prismaService.configParam.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update ConfigParam Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<ConfigParam, Error>> {
    try {
      const result = await this.prismaService.configParam.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete ConfigParam Resource ${id}.`,
      ));
    }
  }
}
