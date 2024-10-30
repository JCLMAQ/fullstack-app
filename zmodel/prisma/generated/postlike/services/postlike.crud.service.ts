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
import { Prisma, PostLike } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class PostLikeCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.PostLikeFindManyArgs,
  ): Promise<Result<PaginationModel<PostLike>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.postLike.findMany(filter),
        this.prismaService.postLike.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get PostLike Resources.`));
    }
  }

  async getById(id: string): Promise<Result<PostLike, Error>> {
    try {
      const result = await this.prismaService.postLike.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`PostLike Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.PostLikeCreateInput): Promise<Result<PostLike, Error>> {
    try {
      const result = await this.prismaService.postLike.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create PostLike Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.PostLikeUpdateInput,
  ): Promise<Result<PostLike, Error>> {
    try {
      const result = await this.prismaService.postLike.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update PostLike Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<PostLike, Error>> {
    try {
      const result = await this.prismaService.postLike.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete PostLike Resource ${id}.`,
      ));
    }
  }
}
