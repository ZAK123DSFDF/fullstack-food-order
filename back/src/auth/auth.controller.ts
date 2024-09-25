import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
  async createUser(@Body() userData: any) {
    try {
      const user = await this.authService.createUser(userData);
      return {
        message: 'User created successfully',
        data: user,
      };
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
  async createServant(@Body() servantData: any) {
    try {
      const servant = await this.authService.createServant(servantData);
      return {
        message: 'servant created successfully',
        data: servant,
      };
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
  async activateServant(@Param('userId') userId: number) {
    try {
      const result = await this.authService.activateServant(Number(userId));
      return {
        message: 'Servant activated successfully',
        data: result,
      };
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
  async deactivateServant(@Param('userId') userId: number) {
    try {
      const result = await this.authService.deactivateServant(Number(userId));
      return {
        message: 'Servant activated successfully',
        data: result,
      };
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
  async deleteServantUser(@Param('userId') userId: number) {
    try {
      const result = await this.authService.deleteServantUser(Number(userId));
      return {
        message: result.message,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('all/:restaurantId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.GET_USERS, Users),
  )
  async getAllServants(@Param('restaurantId') restaurantId: number) {
    try {
      const servants = await this.authService.getAllServants(
        Number(restaurantId),
      );
      return servants;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Post('login')
  async login(@Body() userData: any) {
    try {
      const result = await this.authService.validateUser(userData);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
