import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { z } from 'zod';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  async createOrder(customerId: number, orderData: any): Promise<any> {
    try {
      const improvedOrderData = {
        ...orderData,
        menuId: parseInt(orderData.menuId), // Convert menuId to a number
      };

      const OrderSchema = z.object({
        menuId: z.number().nonnegative('Invalid menu ID'),
        count: z.number().min(1, 'Count must be at least 1').optional(),
        toppings: z.array(z.string()).optional(),
      });
      const parsed = OrderSchema.safeParse(improvedOrderData);
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
      console.log('this is the data', resId, orderId, newStatus);
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
          menu: { include: { restaurant: true } },
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
  async getOrdersByRestaurantId(
    restaurantId: number,
    globalSearch?: string, // Parameter for global search
    orderStatus?: string,
    menuName?: string,
    count?: number,
    price?: number,
    customerName?: string,
    customerEmail?: string,
    customerPhoneNumber?: string,
    customerLocation?: string,
  ): Promise<any[]> {
    try {
      const restaurantExists = await this.prisma.restaurant.findUnique({
        where: { id: restaurantId },
      });
      console.log(typeof restaurantId);
      if (!restaurantExists) {
        throw new NotFoundException(
          `Restaurant with ID ${restaurantId} not found.`,
        );
      }

      const whereClause: any = {
        menu: {
          restaurantId: restaurantId,
        },
      };
      if (globalSearch) {
        whereClause.OR = [
          {
            orderStatus: {
              contains: globalSearch,
              mode: 'insensitive',
            },
          },
          {
            menu: {
              name: {
                contains: globalSearch,
                mode: 'insensitive',
              },
            },
          },
          {
            customer: {
              name: {
                contains: globalSearch,
                mode: 'insensitive',
              },
            },
          },
          {
            customer: {
              email: {
                contains: globalSearch,
                mode: 'insensitive',
              },
            },
          },
          {
            customer: {
              phoneNumber: {
                contains: globalSearch,
                mode: 'insensitive',
              },
            },
          },
          {
            customer: {
              location: {
                contains: globalSearch,
                mode: 'insensitive',
              },
            },
          },
        ];
      }
      if (orderStatus) {
        whereClause.orderStatus = {
          contains: orderStatus,
          mode: 'insensitive',
        };
      }
      if (menuName) {
        whereClause.menu = {
          name: {
            contains: menuName,
            mode: 'insensitive',
          },
        };
      }
      if (customerName) {
        whereClause.customer = {
          name: {
            contains: customerName,
            mode: 'insensitive',
          },
        };
      }
      if (customerEmail) {
        whereClause.customer = {
          email: {
            contains: customerEmail,
            mode: 'insensitive',
          },
        };
      }
      if (customerPhoneNumber) {
        whereClause.customer = {
          phoneNumber: {
            contains: customerPhoneNumber,
            mode: 'insensitive',
          },
        };
      }
      if (customerLocation) {
        whereClause.customer = {
          location: {
            contains: customerLocation,
            mode: 'insensitive',
          },
        };
      }
      if (count !== undefined && !isNaN(Number(count))) {
        whereClause.count = {
          equals: Number(count),
        };
      }
      if (price !== undefined && !isNaN(Number(price))) {
        whereClause.menu.price = {
          equals: Number(price),
        };
      }

      const orders = await this.prisma.order.findMany({
        where: whereClause,
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
