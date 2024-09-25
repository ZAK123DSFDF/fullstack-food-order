import {
  Body,
  Controller,
  Param,
  Post,
  Response,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createRestaurant(
    @Response() res,
    @Body() userData: any,
    @Body() RestaurantData: any,
  ) {
    try {
      const restaurant = this.restaurantService.createRestaurant(
        userData,
        RestaurantData,
      );
      return res.status(200).json({ restaurant });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Post('addAdmin/:restaurantId')
  @UseGuards(JwtAuthGuard)
  async addAdmin(
    @Param('restaurantId') restaurantId: number,
    @Body() userData: any,
  ) {
    try {
      const result = await this.restaurantService.addAdmin(
        userData,
        restaurantId,
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
