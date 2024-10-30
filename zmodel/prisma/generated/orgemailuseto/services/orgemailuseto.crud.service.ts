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
import { Prisma, OrgEmailUseTo } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class OrgEmailUseToCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.OrgEmailUseToFindManyArgs,
  ): Promise<Result<PaginationModel<OrgEmailUseTo>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.orgEmailUseTo.findMany(filter),
        this.prismaService.orgEmailUseTo.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get OrgEmailUseTo Resources.`));
    }
  }

  async getById(id: string): Promise<Result<OrgEmailUseTo, Error>> {
    try {
      const result = await this.prismaService.orgEmailUseTo.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`OrgEmailUseTo Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.OrgEmailUseToCreateInput): Promise<Result<OrgEmailUseTo, Error>> {
    try {
      const result = await this.prismaService.orgEmailUseTo.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create OrgEmailUseTo Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.OrgEmailUseToUpdateInput,
  ): Promise<Result<OrgEmailUseTo, Error>> {
    try {
      const result = await this.prismaService.orgEmailUseTo.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update OrgEmailUseTo Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<OrgEmailUseTo, Error>> {
    try {
      const result = await this.prismaService.orgEmailUseTo.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete OrgEmailUseTo Resource ${id}.`,
      ));
    }
  }
}
