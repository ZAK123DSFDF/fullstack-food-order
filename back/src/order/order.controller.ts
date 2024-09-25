import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
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

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('create')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) =>
    ability.can(AllowedActions.CREATE_ORDER, createOrder),
  )
  async createOrder(@Body() orderData: any) {
    try {
      const result = await this.orderService.createOrder(orderData);
      return result;
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
    @Param('id') orderId: number,
    @Body('status') newStatus: string,
  ) {
    try {
      const result = await this.orderService.updateOrderStatus(
        orderId,
        newStatus,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
