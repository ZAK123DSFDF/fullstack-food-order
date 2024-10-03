import {
  BadRequestException,
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
import { RoleService } from './role.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PoliciesGuard } from 'src/guards/Policies.guard';
import { CheckPolicies } from 'src/decorators/CheckPolicies';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { All } from 'src/classes/All';
import { Role } from 'src/classes/Role';
import { AllowedActions } from 'src/utils/enum';
import { JwtService } from '@nestjs/jwt';

@Controller('role')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private jwt: JwtService,
  ) {}
  @Post('create')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.ADD_ROLE, Role),
  )
  async createServantRole(
    @Response() res,
    @Request() req,
    @Body() servantRoleData: any,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const parsedRestaurantId = parseInt(restaurantId, 10);
      if (isNaN(parsedRestaurantId)) {
        throw new BadRequestException('Invalid restaurantId format');
      }

      const servantRole = await this.roleService.createServantRole(
        servantRoleData,
        parsedRestaurantId,
      );

      res.status(200).json(servantRole);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Patch('activate/:servantRoleId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.UPDATE_ROLE, Role),
  )
  async activateRole(
    @Request() req,
    @Response() res,
    @Param('servantRoleId') servantRoleId: string,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const parsedServantRoleId = parseInt(servantRoleId, 10);
      if (isNaN(parsedServantRoleId)) {
        throw new BadRequestException('Invalid servantRoleId format');
      }

      const servantRole = await this.roleService.activateServantRole(
        restaurantId,
        parsedServantRoleId,
      );
      res.status(200).json(servantRole);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Patch('deactivate/:servantRoleId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.UPDATE_ROLE, Role),
  )
  async deactivateRole(
    @Request() req,
    @Response() res,
    @Param('servantRoleId') servantRoleId: string,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const parsedServantRoleId = parseInt(servantRoleId, 10);
      if (isNaN(parsedServantRoleId)) {
        throw new BadRequestException('Invalid servantRoleId format');
      }

      const servantRole = await this.roleService.deactivateServantRole(
        restaurantId,
        parsedServantRoleId,
      );
      res.status(200).json(servantRole);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Patch('update/:roleId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.UPDATE_ROLE, Role),
  )
  async updateServantRole(
    @Request() req,
    @Response() res,
    @Param('roleId') roleId: string,
    @Body() updateData: any,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const parsedServantRoleId = parseInt(roleId, 10);
      const result = await this.roleService.updateServantRole(
        restaurantId,
        parsedServantRoleId,
        updateData,
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Delete('delete/:roleId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.DELETE_ROLE, Role),
  )
  async deleteServantRole(
    @Request() req,
    @Response() res,
    @Param('roleId') roleId: string,
  ) {
    try {
      const roleIdInt = parseInt(roleId);
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      await this.roleService.deleteServantRole(restaurantId, roleIdInt);
      res.status(200).json('role deleted');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('restaurant')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.GET_ROLES, Role),
  )
  async getAllRoles(
    @Request() req,
    @Response() res,
    @Query('globalSearch') globalSearch?: string,
    @Query('name') name?: string,
    @Query('createdAt') createdAt?: string,
    @Query('active') active?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const roles = await this.roleService.getAllRoles(
        restaurantId,
        globalSearch,
        name,
        createdAt,
        active,
        sortBy,
        sortOrder,
      );
      res.status(200).json(roles);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('restaurant/active')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.GET_ROLES, Role),
  )
  async getAllActiveRoles(@Request() req, @Response() res) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const activeRoles =
        await this.roleService.getAllActiveRoles(restaurantId);
      res.status(200).json(activeRoles);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('restaurant/role/:roleId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.GET_ROLES, Role),
  )
  async getSingleRole(
    @Request() req,
    @Response() res,
    @Param('roleId') roleId: string,
  ) {
    try {
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const roleIdInt = parseInt(roleId);
      const role = await this.roleService.getSingleRole(
        restaurantId,
        roleIdInt,
      );
      res.status(200).json(role);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
