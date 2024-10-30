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
import { Prisma, Profile } from '@prisma/client';
import { PaginationModel } from '@prisma-utils/nestjs-prisma';
import { PrismaService } from 'nestjs-prisma';
import { err, ok, Result } from 'neverthrow';

@Injectable()
export class ProfileCrudService {
  constructor(private readonly prismaService: PrismaService) {}

  getPrisma() {
    return this.prismaService;
  }

  async getAll(
    filter?: Prisma.ProfileFindManyArgs,
  ): Promise<Result<PaginationModel<Profile>, Error>> {
    try {
      const [items, count] = await this.prismaService.$transaction([
        this.prismaService.profile.findMany(filter),
        this.prismaService.profile.count({ where: filter?.where }),
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
      return err(new InternalServerErrorException(`Could not get Profile Resources.`));
    }
  }

  async getById(id: string): Promise<Result<Profile, Error>> {
    try {
      const result = await this.prismaService.profile.findUniqueOrThrow({
        where: { id: id }
      });
      return ok(result);
    } catch(e) {
      return err(new NotFoundException(`Profile Resource ${id} was not found.`));
    }
  }

  async create(data: Prisma.ProfileCreateInput): Promise<Result<Profile, Error>> {
    try {
      const result = await this.prismaService.profile.create({ data: data });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(`Could not create Profile Resource.`));
    }
  }

  async update(
    id: string,
    data: Prisma.ProfileUpdateInput,
  ): Promise<Result<Profile, Error>> {
    try {
      const result = await this.prismaService.profile.update({
        where: { id: id },
        data: data,
      });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not update Profile Resource ${id}.`,
      ));
    }
  }

  async delete(id: string): Promise<Result<Profile, Error>> {
    try {
      const result = await this.prismaService.profile.delete({ where: { id: id } });
      return ok(result);
    } catch (e) {
      return err(new InternalServerErrorException(
        `Could not delete Profile Resource ${id}.`,
      ));
    }
  }
}
