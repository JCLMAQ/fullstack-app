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
import { Prisma, File } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class FileCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.FileFindManyArgs,
  ): Promise<Result<PaginationModel<File>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.file.findMany(filter),
        this.prismaService.file.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get File Resources.`));
    }
  }

  async getById(id: string): Promise<Result<File, Error>> {
    try {
      const result = await this.prismaService.file.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`File Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.FileCreateInput): Promise<Result<File, Error>> {
    try {
      const result = await this.prismaService.file.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create File Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.FileUpdateInput,
  ): Promise<Result<File, Error>> {
    try {
      const result = await this.prismaService.file.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update File Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<File, Error>> {
    try {
      const result = await this.prismaService.file.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete File Resource ${id}.`,
      ));
    }
  }
}
