import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async createOrder(customerId: number, orderData: any): Promise<any> {
    try {
      const OrderSchema = z.object({
        menuId: z.number().nonnegative('Invalid menu ID'),
        count: z.number().min(1, 'Count must be at least 1').optional(),
        toppings: z.array(z.string()).optional(),
      });
      const parsed = OrderSchema.safeParse(orderData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      if (!customerId) {
        throw new NotFoundException('no customer');
      }
      const { menuId, count = 1, toppings = [] } = parsed.data;
      const customer = await this.prisma.user.findUnique({
        where: { id: customerId },
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      const menu = await this.prisma.menu.findUnique({
        where: { id: menuId },
      });
      if (!menu) {
        throw new NotFoundException('Menu item not found');
      }
      if (toppings.length > 0) {
        const invalidToppings = toppings.filter(
          (topping) => !menu.toppings.includes(topping),
        );
        if (invalidToppings.length > 0) {
          throw new BadRequestException(
            `Cannot add toppings: ${invalidToppings.join(', ')}. Only removal is allowed.`,
          );
        }
      }
      const order = await this.prisma.order.create({
        data: {
          customerId,
          menuId,
          count,
          toppings,
        },
      });

      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateOrderStatus(
    resId: number,
    orderId: number,
    newStatus: string,
  ): Promise<any> {
    try {
      const OrderStatusSchema = z.enum(['PREPARING', 'READY', 'DELIVERED']);
      const parsed = OrderStatusSchema.safeParse(newStatus);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }

      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
        include: { menu: true },
      });
      if (resId !== order.menu.restaurantId) {
        throw new BadRequestException('you can only edit your restaurant');
      }
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const updatedOrder = await this.prisma.order.update({
        where: { id: orderId },
        data: { orderStatus: parsed.data },
      });

      return updatedOrder;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getOrderHistoryByCustomerId(customerId: number): Promise<any> {
    try {
      const customerExists = await this.prisma.user.findUnique({
        where: { id: customerId },
      });
      if (!customerExists) {
        throw new NotFoundException(
          `Customer with ID ${customerId} not found.`,
        );
      }
      const orders = await this.prisma.order.findMany({
        where: { customerId },
        include: {
          menu: true,
        },
      });
      if (!orders || orders.length === 0) {
        throw new NotFoundException(
          `No orders found for customer with ID ${customerId}.`,
        );
      }
      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async getOrdersByRestaurantId(restaurantId: number): Promise<any> {
    try {
      const restaurantExists = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });

      if (!restaurantExists) {
        throw new NotFoundException(
          `Restaurant with ID ${restaurantId} not found.`,
        );
      }
      const orders = await this.prisma.order.findMany({
        where: {
          menu: {
            restaurantId: restaurantId,
          },
        },
        include: {
          menu: true,
          customer: true,
        },
      });

      if (orders.length === 0) {
        throw new NotFoundException(
          `No orders found for restaurant with ID ${restaurantId}.`,
        );
      }

      return orders;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
