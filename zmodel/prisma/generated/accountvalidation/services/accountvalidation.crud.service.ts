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
import { Prisma, AccountValidation } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class AccountValidationCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.AccountValidationFindManyArgs,
  ): Promise<Result<PaginationModel<AccountValidation>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.accountValidation.findMany(filter),
        this.prismaService.accountValidation.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get AccountValidation Resources.`));
    }
  }

  async getById(id: string): Promise<Result<AccountValidation, Error>> {
    try {
      const result = await this.prismaService.accountValidation.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`AccountValidation Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.AccountValidationCreateInput): Promise<Result<AccountValidation, Error>> {
    try {
      const result = await this.prismaService.accountValidation.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create AccountValidation Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.AccountValidationUpdateInput,
  ): Promise<Result<AccountValidation, Error>> {
    try {
      const result = await this.prismaService.accountValidation.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update AccountValidation Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<AccountValidation, Error>> {
    try {
      const result = await this.prismaService.accountValidation.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete AccountValidation Resource ${id}.`,
      ));
    }
  }
}
