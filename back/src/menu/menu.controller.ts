import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Response,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { PoliciesGuard } from 'src/guards/Policies.guard';
import { CheckPolicies } from 'src/decorators/CheckPolicies';
import { AppAbility } from 'src/casl/casl-ability.factory';
import { All } from 'src/classes/All';
import { Menu } from 'src/classes/Menu';
import { AllowedActions } from 'src/utils/enum';
import { JwtService } from '@nestjs/jwt';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('menu')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private jwt: JwtService,
    private cloudinaryService: CloudinaryService,
  ) {}
  @Post('create')
  @UseGuards(JwtAuthGuard, PoliciesGuard)
  @UseInterceptors(FilesInterceptor('menuPic'))
  @CheckPolicies(
    (ability: AppAbility) =>
      ability.can(AllowedActions.ALL, All) ||
      ability.can(AllowedActions.ADD_MENU, Menu),
  )
  async createMenu(
    @Request() req,
    @Response() res,
    @Body() menuData: any,
    @UploadedFiles() Files: Express.Multer.File[],
  ) {
    try {
      const menuPic = [];
      for (const file of Files) {
        const Picture = await this.cloudinaryService.uploadFiles(file);
        menuPic.push(Picture.secure_url);
      }
      const restaurantId = this.jwt.decode(req.cookies['token']).restaurantId;
      const result = await this.menuService.createMenu(
        menuPic,
        restaurantId,
        menuData,
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('all')
  async getAllMenus(@Response() res) {
    try {
      const menus = await this.menuService.getAllMenus();
      res.status(200).json(menus);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  @Get('exclude/:id')
  async getMenusExcluding(@Param('id') menuId: number, @Response() res) {
    try {
      const menus = await this.menuService.getMenusExcluding(Number(menuId));
      res.status(200).json(menus);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
