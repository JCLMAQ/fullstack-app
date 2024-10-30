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
import { Prisma, Post } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class PostCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.PostFindManyArgs,
  ): Promise<Result<PaginationModel<Post>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.post.findMany(filter),
        this.prismaService.post.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Post Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Post, Error>> {
    try {
      const result = await this.prismaService.post.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Post Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.PostCreateInput): Promise<Result<Post, Error>> {
    try {
      const result = await this.prismaService.post.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Post Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.PostUpdateInput,
  ): Promise<Result<Post, Error>> {
    try {
      const result = await this.prismaService.post.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Post Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Post, Error>> {
    try {
      const result = await this.prismaService.post.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Post Resource ${id}.`,
      ));
    }
  }
}
