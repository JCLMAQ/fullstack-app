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
import { Prisma, Image } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class ImageCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ImageFindManyArgs,
  ): Promise<Result<PaginationModel<Image>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.image.findMany(filter),
        this.prismaService.image.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Image Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Image, Error>> {
    try {
      const result = await this.prismaService.image.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Image Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ImageCreateInput): Promise<Result<Image, Error>> {
    try {
      const result = await this.prismaService.image.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Image Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.ImageUpdateInput,
  ): Promise<Result<Image, Error>> {
    try {
      const result = await this.prismaService.image.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Image Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Image, Error>> {
    try {
      const result = await this.prismaService.image.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Image Resource ${id}.`,
      ));
    }
  }
}
