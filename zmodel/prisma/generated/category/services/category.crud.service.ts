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
import { Prisma, Category } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class CategoryCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.CategoryFindManyArgs,
  ): Promise<Result<PaginationModel<Category>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.category.findMany(filter),
        this.prismaService.category.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Category Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Category, Error>> {
    try {
      const result = await this.prismaService.category.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Category Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.CategoryCreateInput): Promise<Result<Category, Error>> {
    try {
      const result = await this.prismaService.category.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Category Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.CategoryUpdateInput,
  ): Promise<Result<Category, Error>> {
    try {
      const result = await this.prismaService.category.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Category Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Category, Error>> {
    try {
      const result = await this.prismaService.category.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Category Resource ${id}.`,
      ));
    }
  }
}
