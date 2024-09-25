import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('create/:restaurantId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.ADD_ROLE, Role),
  )
  async createServantRole(
    @Response() res,
    @Param('restaurantId') restaurantId: any,
    @Body() servantRoleData: any,
  ) {
    try {
      const servantRole = this.roleService.createServantRole(
        servantRoleData,
        restaurantId,
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
    @Response() res,
    @Param('servantRoleId') servantRoleId: any,
  ) {
    try {
      const servantRole = this.roleService.activateServantRole(servantRoleId);
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
    @Response() res,
    @Param('servantRoleId') servantRoleId: any,
  ) {
    try {
      const servantRole = this.roleService.deactivateServantRole(servantRoleId);
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
    @Response() res,
    @Param('roleId') roleId: number,
    @Body() updateData: any,
  ) {
    try {
      const result = await this.roleService.updateServantRole(
        roleId,
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
  async deleteServantRole(@Response() res, @Param('roleId') roleId: number) {
    try {
      await this.roleService.deleteServantRole(roleId);
      res.status(200).json('role deleted');
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('restaurant/:restaurantId')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.GET_ROLES, Role),
  )
  async getAllRoles(@Param('restaurantId') restaurantId: number) {
    try {
      const roles = await this.roleService.getAllRoles(restaurantId);
      return roles;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
