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
import { Prisma, Organization } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class OrganizationCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.OrganizationFindManyArgs,
  ): Promise<Result<PaginationModel<Organization>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.organization.findMany(filter),
        this.prismaService.organization.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Organization Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Organization, Error>> {
    try {
      const result = await this.prismaService.organization.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Organization Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.OrganizationCreateInput): Promise<Result<Organization, Error>> {
    try {
      const result = await this.prismaService.organization.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Organization Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.OrganizationUpdateInput,
  ): Promise<Result<Organization, Error>> {
    try {
      const result = await this.prismaService.organization.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Organization Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Organization, Error>> {
    try {
      const result = await this.prismaService.organization.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Organization Resource ${id}.`,
      ));
    }
  }
}
