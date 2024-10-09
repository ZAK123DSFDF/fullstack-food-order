import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PoliciesGuard } from 'src/guards/Policies.guard';
import { CheckPolicies } from 'src/decorators/CheckPolicies';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { createOrder } from 'src/classes/createOrder';
import { All } from 'src/classes/All';
import { Orders } from 'src/classes/Orders';
import { AllowedActions } from 'src/utils/enum';
import { JwtService } from '@nestjs/jwt';
import { OrderHistory } from 'src/classes/OrderHistory';
import { orderStatus } from '@prisma/client';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private jwt: JwtService,
  ) {}
  @Post('create')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(AllowedActions.CREATE_ORDER, createOrder),
  )
  async createOrder(@Body() orderData: any, @Request() req, @Response() res) {
    try {
      const customerId = this.jwt.decode(req.cookies['token']).user;
      const result = await this.orderService.createOrder(customerId, orderData);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Patch('status/:id')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.UPDATE_ORDERS, Orders),
  )
  async updateOrderStatus(
    @Request() req,
    @Response() res,
    @Param('id') orderId: string,
    @Body('status') newStatus: string,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const idInt = parseInt(orderId);
      const result = await this.orderService.updateOrderStatus(
        restaurantId,
        idInt,
        newStatus,
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('history')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(AllowedActions.ORDER_HISTORY, OrderHistory),
  )
  async getOrderHistory(@Request() req, @Response() res) {
    try {
      const customerId = this.jwt.decode(req.cookies['token']).user;
      const orderHistory =
        await this.orderService.getOrderHistoryByCustomerId(customerId);
      res.status(200).json(orderHistory);
    } catch (error) {
      throw error;
    }
  }
  @Get('restaurant')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.SEE_ORDERS, Orders),
  )
  async getOrdersByRestaurant(
    @Request() req,
    @Response() res,
    @Query('globalSearch') globalSearch?: string,
    @Query('orderStatus') orderStatus?: string,
    @Query('menuName') menuName?: string,
    @Query('count') count?: any,
    @Query('price') price?: any,
    @Query('createdAt') createdAt?: string,
    @Query('customerName') customerName?: string,
    @Query('customerEmail') customerEmail?: string,
    @Query('customerPhoneNumber') customerPhoneNumber?: string,
    @Query('customerLocation') customerLocation?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: string,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const orders = await this.orderService.getOrdersByRestaurantId(
        restaurantId,
        globalSearch,
        orderStatus,
        menuName,
        count,
        price,
        createdAt,
        customerName,
        customerEmail,
        customerPhoneNumber,
        customerLocation,
        sortBy,
        sortOrder,
      );
      return res.status(200).json(orders);
    } catch (error) {
      console.error(error);
      return res
        .status(error.status || 500)
        .json({ message: error.message || 'Internal Server Error' });
    }
  }
}
