import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { RoleModule } from './role/role.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [AuthModule, RestaurantModule, RoleModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
