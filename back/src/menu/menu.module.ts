import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [MenuController],
  providers: [
    MenuService,
    PrismaService,
    JwtStrategy,
    JwtService,
    CaslAbilityFactory,
    CloudinaryService,
  ],
})
export class MenuModule {}
