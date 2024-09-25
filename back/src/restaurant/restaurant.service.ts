import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class RestaurantService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}
  async createRestaurant(userData: any, restaurantData: any): Promise<any> {
    try {
      const UserSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z
          .string()
          .email('Invalid email format')
          .min(1, 'Email is required'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        phoneNumber: z.string().min(1, 'Phone number is required'),
        location: z.string().min(1, 'location is required').optional(),
      });
      const RestaurantSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        location: z.string().min(1, 'Location is required'),
      });
      const userParsed = UserSchema.safeParse(userData);
      if (!userParsed.success) {
        throw new BadRequestException(userParsed.error.errors);
      }
      const restaurantParsed = RestaurantSchema.safeParse(restaurantData);
      if (!restaurantParsed.success) {
        throw new BadRequestException(restaurantParsed.error.errors);
      }
      const existingUser = await this.prisma.user.findUnique({
        where: { email: userParsed.data.email },
      });
      if (existingUser) {
        throw new BadRequestException('user already exist');
      }
      let userId: any;
      const newUser = await this.prisma.user.create({
        data: {
          name: userParsed.data.name,
          email: userParsed.data.email,
          password: userParsed.data.password,
          phoneNumber: userParsed.data.phoneNumber,
          location: userParsed.data.location,
          role: 'ADMIN',
        },
      });
      userId = newUser.id;
      const restaurant = await this.prisma.restaurant.create({
        data: {
          name: restaurantParsed.data.name,
          location: restaurantParsed.data.location,
          users: {
            connect: { id: userId },
          },
        },
      });
      const token = this.jwt.sign(
        {
          user: newUser.id,
          email: newUser.email,
          role: newUser.role,
          restaurantId: restaurant.id,
        },
        { secret: process.env.secret },
      );
      return { restaurant, token };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async addAdmin(userData: any, restaurantId: number): Promise<any> {
    try {
      const UserSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z
          .string()
          .email('Invalid email format')
          .min(1, 'Email is required'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        phoneNumber: z.string(),
        location: z.string().optional(),
      });
      const parsed = UserSchema.safeParse(userData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });
      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      const existingUser = await this.prisma.user.findUnique({
        where: { email: parsed.data.email },
      });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }
      const newUser = await this.prisma.user.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          password: parsed.data.password,
          phoneNumber: parsed.data.phoneNumber,
          location: parsed.data.location,
          role: 'ADMIN',
          restaurantId,
        },
      });
      await this.prisma.restaurant.update({
        where: { id: restaurantId },
        data: {
          users: {
            connect: { id: newUser.id },
          },
        },
      });
      const token = this.jwt.sign(
        {
          user: newUser.id,
          email: newUser.email,
          role: newUser.role,
          restaurantId,
        },
        { secret: process.env.secret },
      );
      return {
        message: 'New user added as admin successfully',
        userId: newUser.id,
        token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
