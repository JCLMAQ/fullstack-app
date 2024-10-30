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
import { Prisma, ChangesTracking } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class ChangesTrackingCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ChangesTrackingFindManyArgs,
  ): Promise<Result<PaginationModel<ChangesTracking>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.changesTracking.findMany(filter),
        this.prismaService.changesTracking.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get ChangesTracking Resources.`));
    }
  }

  async getById(id: string): Promise<Result<ChangesTracking, Error>> {
    try {
      const result = await this.prismaService.changesTracking.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`ChangesTracking Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ChangesTrackingCreateInput): Promise<Result<ChangesTracking, Error>> {
    try {
      const result = await this.prismaService.changesTracking.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create ChangesTracking Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.ChangesTrackingUpdateInput,
  ): Promise<Result<ChangesTracking, Error>> {
    try {
      const result = await this.prismaService.changesTracking.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update ChangesTracking Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<ChangesTracking, Error>> {
    try {
      const result = await this.prismaService.changesTracking.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete ChangesTracking Resource ${id}.`,
      ));
    }
  }
}
