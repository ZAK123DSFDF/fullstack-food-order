import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    PrismaService,
    JwtStrategy,
    JwtService,
    CaslAbilityFactory,
  ],
})
export class RoleModule {}
