import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  async createMenu(menuData: any): Promise<any> {
    try {
      const MenuSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        price: z.number().min(1, 'Price must be greater than zero'),
        restaurantId: z.number().nonnegative('Invalid restaurant ID'),
        toppings: z.array(z.string()).optional(),
      });
      const parsed = MenuSchema.safeParse(menuData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const { name, price, restaurantId, toppings } = parsed.data;
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      const menu = await this.prisma.menu.create({
        data: {
          name,
          price,
          restaurantId,
          toppings: toppings || [],
        },
      });
      return { message: 'Menu item created successfully', menu };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllMenus(): Promise<any> {
    try {
      const menus = await this.prisma.menu.findMany();

      return menus;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not fetch menus');
    }
  }
  async getMenusExcluding(menuId: number): Promise<any> {
    try {
      const menus = await this.prisma.menu.findMany({
        where: {
          id: {
            not: menuId,
          },
        },
      });

      return menus;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not fetch menus');
    }
  }
}
