import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';
import * as sharp from 'sharp';
import axios from 'axios';
@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}
  async createMenu(
    menuPic: string[],
    resId: number,
    menuData: any,
  ): Promise<any> {
    try {
      const preparedMenuData = {
        ...menuData,
        price: parseFloat(menuData.price),
      };
      const MenuSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        price: z.number().min(1, 'Price must be greater than zero'),
        toppings: z.array(z.string()).optional(),
      });
      const parsed = MenuSchema.safeParse(preparedMenuData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const { name, price, toppings } = parsed.data;
      const restaurant = await this.prisma.restaurant.findUnique({
        where: { id: resId },
      });

      if (!restaurant) {
        throw new NotFoundException('Restaurant not found');
      }
      const menu = await this.prisma.menu.create({
        data: {
          name,
          price,
          restaurantId: resId,
          toppings: toppings || [],
          Picture: menuPic,
        },
      });
      return menu;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getAllMenus(): Promise<any> {
    try {
      const menus = await this.prisma.menu.findMany({
        include: { restaurant: true },
      });
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
        include: { restaurant: true },
      });

      return menus;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Could not fetch menus');
    }
  }
  async getSingleMenu(id: any) {
    try {
      const menu = this.prisma.menu.findUnique({ where: { id } });
      return menu;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
