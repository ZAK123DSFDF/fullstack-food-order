import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [RestaurantController],
  providers: [
    RestaurantService,
    PrismaService,
    JwtStrategy,
    JwtService,
    CaslAbilityFactory,
    CloudinaryService,
  ],
})
export class RestaurantModule {}
