import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    JwtStrategy,
    JwtService,
    CaslAbilityFactory,
  ],
})
export class OrderModule {}
