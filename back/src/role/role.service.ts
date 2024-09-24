import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}
  async createServantRole(servantRoleData: any): Promise<any> {
    const ServantRoleSchema = z.object({
      name: z.string().min(1, 'Role name is required'),
      allowedActions: z
        .array(
          z.enum([
            'SEE_ORDERS',
            'UPDATE_ORDERS',
            'SEE_CUSTOMER_INFO',
            'ADD_MENU',
            'ADD_ROLE',
            'UPDATE_ROLE',
            'DELETE_ROLE',
            'ADD_USER',
            'UPDATE_USER',
            'DELETE_USER',
          ]),
        )
        .nonempty('At least one allowed action is required'),
    });
    const parsed = ServantRoleSchema.safeParse(servantRoleData);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.errors);
    }
    const { name, allowedActions } = parsed.data;
    try {
      const newServantRole = await this.prisma.servantRole.create({
        data: {
          name,
          allowedActions,
          active: true,
        },
      });

      return newServantRole;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Error creating servant role');
    }
  }
  async activateServantRole(roleId: number): Promise<any> {
    const role = await this.prisma.servantRole.findUnique({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException('Servant role not found');
    }
    if (role.active) {
      throw new BadRequestException('Servant role is already active');
    }

    const updatedRole = await this.prisma.servantRole.update({
      where: { id: roleId },
      data: { active: true },
    });
    return updatedRole;
  }
  async deactivateServantRole(roleId: number): Promise<any> {
    const role = await this.prisma.servantRole.findUnique({
      where: { id: roleId },
    });
    if (!role) {
      throw new NotFoundException('Servant role not found');
    }
    if (!role.active) {
      throw new BadRequestException('Servant role is already deactivated');
    }

    const updatedRole = await this.prisma.servantRole.update({
      where: { id: roleId },
      data: { active: false },
    });
    return updatedRole;
  }
  async updateServantRole(roleId: number, updateData: any): Promise<any> {
    const updateServantRoleSchema = z.object({
      name: z.string().min(1).optional(),
      allowedActions: z
        .array(
          z.enum([
            'SEE_ORDERS',
            'UPDATE_ORDERS',
            'SEE_CUSTOMER_INFO',
            'ADD_MENU',
            'ADD_ROLE',
            'UPDATE_ROLE',
            'DELETE_ROLE',
            'ADD_USER',
            'UPDATE_USER',
            'DELETE_USER',
          ]),
        )
        .optional(),
    });
    try {
      const parsed = updateServantRoleSchema.safeParse(updateData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const existingRole = await this.prisma.servantRole.findUnique({
        where: { id: roleId },
      });
      if (!existingRole) {
        throw new NotFoundException(
          `Servant role with ID ${roleId} not found.`,
        );
      }
      const updatedRole = await this.prisma.servantRole.update({
        where: { id: roleId },
        data: {
          ...parsed.data,
        },
      });

      return updatedRole;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteServantRole(roleId: number): Promise<any> {
    try {
      const existingRole = await this.prisma.servantRole.findUnique({
        where: { id: roleId },
      });

      if (!existingRole) {
        throw new NotFoundException(
          `Servant role with ID ${roleId} not found.`,
        );
      }
      await this.prisma.servantRole.delete({
        where: { id: roleId },
      });
      return { message: `Servant role with ID ${roleId} has been deleted.` };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
