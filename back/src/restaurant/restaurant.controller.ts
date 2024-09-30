import {
  Body,
  Controller,
  Param,
  Post,
  Request,
  Response,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { AllowedActions } from 'src/utils/enum';
import { All } from 'src/classes/All';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { CheckPolicies } from 'src/decorators/CheckPolicies';
import { PoliciesGuard } from 'src/guards/Policies.guard';
import { JwtService } from '@nestjs/jwt';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private cloudinaryService: CloudinaryService,
    private jwt: JwtService,
  ) {}
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('restaurantPic'))
  async createRestaurant(
    @Response() res,
    @Body() userData: any,
    @UploadedFile() File: Express.Multer.File,
    @Body() RestaurantData: any,
  ) {
    try {
      const RestaurantImage = await this.cloudinaryService.uploadFile(File);
      const restaurant = await this.restaurantService.createRestaurant(
        RestaurantImage.secure_url,
        userData,
        RestaurantData,
      );
      res.status(200).json(restaurant);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Post('addAdmin')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(AllowedActions.ALL, All))
  async addAdmin(@Request() req, @Body() userData: any, @Response() res) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const result = await this.restaurantService.addAdmin(
        userData,
        restaurantId,
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
