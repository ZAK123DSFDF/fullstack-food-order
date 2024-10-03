import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PoliciesGuard } from 'src/guards/Policies.guard';
import { CheckPolicies } from 'src/decorators/CheckPolicies';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { All } from 'src/classes/All';
import { Users } from 'src/classes/Users';
import { AllowedActions } from 'src/utils/enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwt: JwtService,
  ) {}
  @Get('check')
  async isAuthenticated(@Request() req, @Response() res) {
    try {
      const decode = this.jwt.decode(req.cookies['token']);
      res.status(200).json({
        isAuthenticated: true,
        id: decode.user,
        email: decode.email,
        role: decode.role,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('logout')
  async logout(@Response() res) {
    try {
      res.clearCookie('token');
      console.log('logout successful');
      res.status(200).json('logout successful');
    } catch (error) {
      console.log(error);
      res.status(500).json(error.message);
    }
  }
  @Post('create')
  async createUser(@Response() res, @Body() userData: any) {
    try {
      const user = await this.authService.createUser(userData);
      res.cookie('token', user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Post('createServant')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.ADD_USER, Users),
  )
  async createServant(
    @Request() req,
    @Response() res,
    @Body() servantData: any,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const servant = await this.authService.createServant(
        restaurantId,
        servantData,
      );
      res.status(200).json(servant);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Patch('activate/:userId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.UPDATE_USER, Users),
  )
  async activateServant(
    @Request() req,
    @Response() res,
    @Param('userId') userId: number,
  ) {
    try {
      console.log('this is activate');
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const result = await this.authService.activateServant(
        restaurantId,
        Number(userId),
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Patch('deactivate/:userId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.UPDATE_USER, Users),
  )
  async deactivateServant(
    @Request() req,
    @Response() res,
    @Param('userId') userId: number,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const result = await this.authService.deactivateServant(
        restaurantId,
        Number(userId),
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Delete('delete/:userId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.DELETE_USER, Users),
  )
  async deleteServantUser(
    @Request() req,
    @Response() res,
    @Param('userId') userId: number,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const result = await this.authService.deleteServantUser(
        restaurantId,
        Number(userId),
      );
      res.status(200).json(result.message);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('all')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.GET_USERS, Users),
  )
  async getAllServants(
    @Request() req,
    @Response() res,
    @Query('globalSearch') globalSearch?: string,
    @Query('name') name?: string,
    @Query('phoneNumber') phoneNumber?: string,
    @Query('email') email?: string,
    @Query('location') location?: string,
    @Query('active') active?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    try {
      console.log('incoming data');
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;

      // Pass the query parameters to the service
      const servants = await this.authService.getAllServants(restaurantId, {
        globalSearch,
        name,
        phoneNumber,
        email,
        location,
        active,
        sortBy,
        sortOrder,
      });

      res.status(200).json(servants);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Post('login')
  async login(@Response() res, @Body() userData: any) {
    try {
      const result = await this.authService.validateUser(userData);
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
      });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
