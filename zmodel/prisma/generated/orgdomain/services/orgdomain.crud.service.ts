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
import { Prisma, OrgDomain } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class OrgDomainCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.OrgDomainFindManyArgs,
  ): Promise<Result<PaginationModel<OrgDomain>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.orgDomain.findMany(filter),
        this.prismaService.orgDomain.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get OrgDomain Resources.`));
    }
  }

  async getById(id: string): Promise<Result<OrgDomain, Error>> {
    try {
      const result = await this.prismaService.orgDomain.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`OrgDomain Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.OrgDomainCreateInput): Promise<Result<OrgDomain, Error>> {
    try {
      const result = await this.prismaService.orgDomain.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create OrgDomain Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.OrgDomainUpdateInput,
  ): Promise<Result<OrgDomain, Error>> {
    try {
      const result = await this.prismaService.orgDomain.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update OrgDomain Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<OrgDomain, Error>> {
    try {
      const result = await this.prismaService.orgDomain.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete OrgDomain Resource ${id}.`,
      ));
    }
  }
}
