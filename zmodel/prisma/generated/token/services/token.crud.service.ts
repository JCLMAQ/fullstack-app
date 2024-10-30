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
import { Prisma, Token } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class TokenCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.TokenFindManyArgs,
  ): Promise<Result<PaginationModel<Token>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.token.findMany(filter),
        this.prismaService.token.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Token Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Token, Error>> {
    try {
      const result = await this.prismaService.token.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Token Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.TokenCreateInput): Promise<Result<Token, Error>> {
    try {
      const result = await this.prismaService.token.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Token Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.TokenUpdateInput,
  ): Promise<Result<Token, Error>> {
    try {
      const result = await this.prismaService.token.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Token Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Token, Error>> {
    try {
      const result = await this.prismaService.token.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Token Resource ${id}.`,
      ));
    }
  }
}
