import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    try {
      const organization = await this.prisma.organization.create({
        data: {
          name: createOrganizationDto.name,
          description: createOrganizationDto.description,
          emailITAdmin: createOrganizationDto.emailITAdmin,
          webSite: createOrganizationDto.webSite,
          published: createOrganizationDto.published ?? false,
          isPublic: createOrganizationDto.isPublic ?? true,
          isDeleted: 0,
          ...(createOrganizationDto.mainOrgId && { mainOrgId: createOrganizationDto.mainOrgId })
        }
      });

      return organization;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        throw new ConflictException(`Organization with name '${createOrganizationDto.name}' already exists`);
      }
      throw error;
    }
  }

  async findAll(includeDeleted = false) {
    const whereCondition = includeDeleted ? {} : { isDeleted: 0 };

    return this.prisma.organization.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findOne(id: string, includeDeleted = false) {
    const whereCondition = includeDeleted
      ? { id }
      : { id, isDeleted: 0 };

    const organization = await this.prisma.organization.findUnique({
      where: whereCondition
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID '${id}' not found`);
    }

    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    // Vérifier que l'organisation existe
    await this.findOne(id);

    try {
      const { mainOrgId, ...updateData } = updateOrganizationDto;

      const data: any = {
        ...updateData,
        updatedAt: new Date(),
      };

      if (mainOrgId !== undefined) {
        data.mainOrgId = mainOrgId;
      }

      const organization = await this.prisma.organization.update({
        where: { id },
        data: data,
      });

      return organization;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        throw new ConflictException(`Organization with name '${updateOrganizationDto.name}' already exists`);
      }
      throw error;
    }
  }

  async remove(id: string, softDelete = true) {
    // Vérifier que l'organisation existe
    await this.findOne(id);

    if (softDelete) {
      return this.prisma.organization.update({
        where: { id },
        data: {
          isDeleted: 1,
          isDeletedDT: new Date(),
          updatedAt: new Date()
        }
      });
    } else {
      return this.prisma.organization.delete({
        where: { id }
      });
    }
  }

  async restore(id: string) {
    // Vérifier que l'organisation existe (même supprimée)
    const organization = await this.prisma.organization.findUnique({
      where: { id }
    });

    if (!organization) {
      throw new NotFoundException(`Organization with ID '${id}' not found`);
    }

    if (organization.isDeleted === 0) {
      throw new ConflictException(`Organization with ID '${id}' is not deleted`);
    }

    return this.prisma.organization.update({
      where: { id },
      data: {
        isDeleted: 0,
        isDeletedDT: null,
        updatedAt: new Date()
      }
    });
  }

  async addMember(organizationId: string, userId: string) {
    // Vérifier que l'organisation existe
    await this.findOne(organizationId);

    // Vérifier que l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      throw new NotFoundException(`User with ID '${userId}' not found`);
    }

    return this.prisma.organization.update({
      where: { id: organizationId },
      data: {
        Members: {
          connect: { id: userId }
        },
        updatedAt: new Date()
      }
    });
  }

  async removeMember(organizationId: string, userId: string) {
    // Vérifier que l'organisation existe
    await this.findOne(organizationId);

    return this.prisma.organization.update({
      where: { id: organizationId },
      data: {
        Members: {
          disconnect: { id: userId }
        },
        updatedAt: new Date()
      }
    });
  }
}
