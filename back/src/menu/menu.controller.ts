import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PoliciesGuard } from 'src/guards/Policies.guard';
import { CheckPolicies } from 'src/decorators/CheckPolicies';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { All } from 'src/classes/All';
import { Menu } from 'src/classes/Menu';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Post('create')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.ADD_MENU, Menu),
  )
  async createMenu(@Body() menuData: any) {
    try {
      const result = await this.menuService.createMenu(menuData);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('all')
  async getAllMenus() {
    try {
      const menus = await this.menuService.getAllMenus();
      return menus;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('exclude/:id')
  async getMenusExcluding(@Param('id') menuId: number) {
    try {
      const menus = await this.menuService.getMenusExcluding(Number(menuId));
      return menus;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
