import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { PrismaService } from './prisma.service';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { CaslModule } from './casl/casl.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    AuthModule,
    RestaurantModule,
    RoleModule,
    MenuModule,
    OrderModule,
    CaslModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    JwtStrategy,
    JwtService,
    CaslAbilityFactory,
  ],
})
export class AppModule {}
