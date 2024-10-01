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
  async createServantRole(
    servantRoleData: any,
    restaurantId: any,
  ): Promise<any> {
    try {
      const ServantRoleSchema = z.object({
        name: z.string().min(1, 'Role name is required'),
        allowedActions: z
          .array(
            z.enum([
              'SEE_ORDERS',
              'UPDATE_ORDERS',
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
      const newServantRole = await this.prisma.servantRole.create({
        data: {
          restaurantId,
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
  async activateServantRole(resId: number, roleId: number): Promise<any> {
    try {
      const role = await this.prisma.servantRole.findUnique({
        where: { id: roleId },
        select: {
          id: true,
          restaurantId: true,
          active: true,
        },
      });
      if (resId !== role.restaurantId) {
        throw new BadRequestException(
          'you cannot update other restaurant role',
        );
      }
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deactivateServantRole(resId: number, roleId: number): Promise<any> {
    try {
      const role = await this.prisma.servantRole.findUnique({
        where: { id: roleId },
        select: {
          id: true,
          restaurantId: true,
          active: true,
        },
      });
      if (resId !== role.restaurantId) {
        throw new BadRequestException(
          'you can only update your restaurant role',
        );
      }
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async updateServantRole(
    resId: number,
    roleId: number,
    updateData: any,
  ): Promise<any> {
    try {
      console.log(resId, roleId, updateData);
      const updateServantRoleSchema = z.object({
        name: z.string().min(1).optional(),
        allowedActions: z
          .array(
            z.enum([
              'SEE_ORDERS',
              'UPDATE_ORDERS',
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
      if (existingRole.restaurantId !== resId) {
        throw new BadRequestException('you can only update your restaurant');
      }
      const newAllowedActions = parsed.data.allowedActions
        ? parsed.data.allowedActions
        : existingRole.allowedActions;
      const updatedRole = await this.prisma.servantRole.update({
        where: { id: roleId },
        data: {
          name: parsed.data.name || existingRole.name,
          allowedActions: newAllowedActions,
        },
      });

      return updatedRole;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteServantRole(resId: number, roleId: number): Promise<any> {
    try {
      const existingRole = await this.prisma.servantRole.findUnique({
        where: { id: roleId },
      });

      if (!existingRole) {
        throw new NotFoundException(
          `Servant role with ID ${roleId} not found.`,
        );
      }
      if (resId !== existingRole.restaurantId) {
        throw new BadRequestException('you can only edit your own restaurant');
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
  async getAllRoles(restaurantId: number): Promise<any> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      const roles = await this.prisma.servantRole.findMany({
        where: { restaurantId },
      });

      return roles;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllActiveRoles(restaurantId: number): Promise<any> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      const activeRoles = await this.prisma.servantRole.findMany({
        where: {
          restaurantId,
          active: true,
        },
      });

      return activeRoles;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getSingleRole(restaurantId: number, roleId: number): Promise<any> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }

      const role = await this.prisma.servantRole.findFirst({
        where: {
          id: roleId,
          restaurantId,
        },
      });

      if (!role) {
        throw new NotFoundException('Role not found in this restaurant');
      }

      return role;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
