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
  async createOrder(orderData: any): Promise<any> {
    try {
      const OrderSchema = z.object({
        customerId: z.number().nonnegative('Invalid customer ID'),
        menuId: z.number().nonnegative('Invalid menu ID'),
        count: z.number().min(1, 'Count must be at least 1').optional(),
        toppings: z.array(z.string()).optional(),
      });
      const parsed = OrderSchema.safeParse(orderData);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }
      const { customerId, menuId, count = 1, toppings = [] } = parsed.data;
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

      return { message: 'Order created successfully', order };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateOrderStatus(orderId: number, newStatus: string): Promise<any> {
    const OrderStatusSchema = z.enum(['PREPARING', 'READY', 'DELIVERED']);
    try {
      const parsed = OrderStatusSchema.safeParse(newStatus);
      if (!parsed.success) {
        throw new BadRequestException(parsed.error.errors);
      }

      const order = await this.prisma.order.findUnique({
        where: { id: orderId },
      });

      if (!order) {
        throw new NotFoundException('Order not found');
      }
      const updatedOrder = await this.prisma.order.update({
        where: { id: orderId },
        data: { orderStatus: parsed.data },
      });

      return {
        message: 'Order status updated successfully',
        order: updatedOrder,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getOrderHistoryByCustomerId(customerId: number): Promise<any> {
    const customerExists = await this.prisma.user.findUnique({
      where: { id: customerId },
    });
    if (!customerExists) {
      throw new NotFoundException(`Customer with ID ${customerId} not found.`);
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
  }
  async getOrdersByRestaurantId(restaurantId: number): Promise<any> {
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
  }
}
