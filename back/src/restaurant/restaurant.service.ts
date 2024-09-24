import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}
  async createRestaurant(userId: number, restaurantData: any): Promise<any> {
    try {
      const RestaurantSchema = z.object({
        name: z.string().min(1, 'Name is required'),
      });
      const parsed = RestaurantSchema.safeParse(restaurantData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      if (user.role !== 'ADMIN') {
        throw new BadRequestException('only admins can create restaurants');
      }
      const existingRestaurant = await this.prisma.restaurant.findFirst({
        where: { adminId: userId },
      });

      if (existingRestaurant) {
        throw new ConflictException(
          'User is already an admin of another restaurant',
        );
      }
      const restaurant = await this.prisma.restaurant.create({
        data: {
          name: restaurantData.name,
          admin: {
            connect: { id: userId },
          },
        },
      });

      return restaurant;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
