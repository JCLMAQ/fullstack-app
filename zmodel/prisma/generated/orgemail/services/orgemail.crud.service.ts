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
import { Prisma, OrgEmail } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class OrgEmailCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.OrgEmailFindManyArgs,
  ): Promise<Result<PaginationModel<OrgEmail>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.orgEmail.findMany(filter),
        this.prismaService.orgEmail.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get OrgEmail Resources.`));
    }
  }

  async getById(id: string): Promise<Result<OrgEmail, Error>> {
    try {
      const result = await this.prismaService.orgEmail.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`OrgEmail Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.OrgEmailCreateInput): Promise<Result<OrgEmail, Error>> {
    try {
      const result = await this.prismaService.orgEmail.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create OrgEmail Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.OrgEmailUpdateInput,
  ): Promise<Result<OrgEmail, Error>> {
    try {
      const result = await this.prismaService.orgEmail.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update OrgEmail Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<OrgEmail, Error>> {
    try {
      const result = await this.prismaService.orgEmail.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete OrgEmail Resource ${id}.`,
      ));
    }
  }
}
