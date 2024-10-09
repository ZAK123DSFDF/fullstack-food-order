import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async createUser(userData: any): Promise<any> {
    try {
      const SignupSchema = z.object({
        name: z.string().min(1, 'Name is required').optional(),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        location: z.string(),
        phoneNumber: z.string(),
        servantRole: z.array(z.string()).optional(),
      });
      const parsed = SignupSchema.safeParse(userData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const { name, email, password, location, phoneNumber } = parsed.data;
      const existUser = await this.prisma.user.findUnique({ where: { email } });
      if (existUser) {
        throw new ConflictException('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          location,
          phoneNumber,
        },
      });
      const token = this.jwt.sign(
        {
          user: user.id,
          email: user.email,
          role: user.role,
        },
        { secret: process.env.secret },
      );
      return { user, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async createServant(resId: number, userData: any): Promise<any> {
    try {
      const userDataParsed = {
        ...userData,
        servantRoleId: parseInt(userData.servantRoleId, 10),
      };
      console.log(userDataParsed);
      const SignupSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        location: z.string(),
        phoneNumber: z.string(),
        servantRoleId: z.number(),
      });
      const parsed = SignupSchema.safeParse(userDataParsed);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const { name, email, password, location, phoneNumber, servantRoleId } =
        parsed.data;
      const existUser = await this.prisma.user.findUnique({ where: { email } });
      if (existUser) {
        throw new ConflictException('Email already exists');
      }
      if (servantRoleId) {
        const existingServantRole = await this.prisma.servantRole.findUnique({
          where: { id: servantRoleId },
        });
        if (!existingServantRole) {
          throw new BadRequestException('Invalid servant role ID.');
        }
        if (!existingServantRole.active) {
          throw new BadRequestException('Servant role is not active.');
        }
      }
      if (resId) {
        const existingRestaurant = await this.prisma.restaurant.findUnique({
          where: { id: resId },
        });
        if (!existingRestaurant) {
          throw new BadRequestException('Invalid restaurant ID.');
        }
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          location,
          phoneNumber,
          role: 'SERVANT',
          servantRole: {
            connect: { id: servantRoleId },
          },
          restaurant: {
            connect: { id: resId },
          },
        },
      });

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async activateServant(resId: number, userId: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (resId !== user.restaurantId) {
        throw new BadRequestException('you can only edit your restaurant');
      }
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.role !== 'SERVANT') {
        throw new BadRequestException('Only servant users can be activated');
      }
      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { active: true },
      });
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deactivateServant(resId: number, userId: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (resId !== user.restaurantId) {
        throw new BadRequestException('you can only edit your restaurant');
      }
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (user.role !== 'SERVANT') {
        throw new BadRequestException('Only servant users can be deactivated');
      }

      const updatedUser = await this.prisma.user.update({
        where: { id: userId },
        data: { active: false },
      });

      return updatedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteServantUser(resId: number, userId: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (resId !== user.restaurantId) {
        throw new BadRequestException('you can only edit your restaurant');
      }
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.role !== 'SERVANT') {
        throw new BadRequestException('Only servant users can be deleted');
      }
      await this.prisma.user.delete({
        where: { id: userId },
      });
      return {
        message: 'Servant user has been deleted successfully',
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllServants(
    restaurantId: number,
    filters: {
      globalSearch?: string;
      name?: string;
      phoneNumber?: string;
      email?: string;
      location?: string;
      active?: string;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    },
  ): Promise<any[]> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }

      const {
        globalSearch,
        name,
        phoneNumber,
        email,
        location,
        active,
        sortBy,
        sortOrder = 'asc',
      } = filters;
      const whereCondition: any = {
        role: 'SERVANT',
        restaurantId,
      };
      if (globalSearch) {
        whereCondition.OR = [
          { name: { contains: globalSearch, mode: 'insensitive' } },
          { phoneNumber: { contains: globalSearch, mode: 'insensitive' } },
          { email: { contains: globalSearch, mode: 'insensitive' } },
          { location: { contains: globalSearch, mode: 'insensitive' } },
        ];
      }
      if (name) {
        whereCondition.name = { contains: name, mode: 'insensitive' };
      }
      if (phoneNumber) {
        whereCondition.phoneNumber = {
          contains: phoneNumber,
          mode: 'insensitive',
        };
      }
      if (email) {
        whereCondition.email = { contains: email, mode: 'insensitive' };
      }
      if (location) {
        whereCondition.location = { contains: location, mode: 'insensitive' };
      }
      if (active === 'true' || active === 'false') {
        whereCondition.active = active === 'true';
      }
      const orderBy = {};
      if (sortBy) {
        orderBy[sortBy] = sortOrder;
      }
      const servants = await this.prisma.user.findMany({
        where: whereCondition,
        orderBy: orderBy,
      });

      return servants;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async validateUser(userData: any): Promise<any> {
    try {
      const { email, password } = userData;

      if (!email || !password) {
        throw new NotFoundException('User not found');
      }
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: { servantRole: true },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new BadRequestException('Invalid credentials');
      }
      const payload: any = {
        user: user.id,
        email: user.email,
        role: user.role,
      };
      if (user.restaurantId) {
        payload.restaurantId = user.restaurantId;
      }
      if (user.role === 'SERVANT' && user.servantRoleId) {
        payload.servantRoleId = user.servantRoleId;
      }
      const token = this.jwt.sign(payload, {
        secret: process.env.secret,
      });
      return {
        user,
        token,
        restaurantId: user.restaurantId || null,
        servantRoleId: user.role === 'SERVANT' ? user.servantRoleId : null,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
