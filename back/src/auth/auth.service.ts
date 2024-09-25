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
  async createServant(userData: any): Promise<any> {
    try {
      const SignupSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        location: z.string(),
        phoneNumber: z.string(),
        servantRoleId: z.number().optional(),
        restaurantId: z.number().optional(),
      });
      const parsed = SignupSchema.safeParse(userData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const {
        name,
        email,
        password,
        location,
        phoneNumber,
        servantRoleId,
        restaurantId,
      } = parsed.data;
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
      if (restaurantId) {
        const existingRestaurant = await this.prisma.restaurant.findUnique({
          where: { id: restaurantId },
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
            connect: { id: restaurantId },
          },
        },
      });

      const token = this.jwt.sign(
        {
          user: user.id,
          email: user.email,
          role: user.role,
          restaurantId,
          servantRoleId,
        },
        { secret: process.env.secret },
      );
      return { user, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async activateServant(userId: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
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
      return {
        message: 'User has been activated',
        user: updatedUser,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deactivateServant(userId: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
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

      return {
        message: 'User has been deactivated',
        user: updatedUser,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async deleteServantUser(userId: number): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
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
  async getAllServants(restaurantId: number): Promise<any[]> {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      const servants = await this.prisma.user.findMany({
        where: {
          role: 'SERVANT',
          restaurantId,
        },
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
        throw new NotFoundException('user not found');
      }
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new NotFoundException('user not found');
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new BadRequestException('credentials not correct');
      }
      const token = this.jwt.sign(
        { user: user.id, email: user.email, role: user.role },
        { secret: process.env.secret },
      );
      return { user, token };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
