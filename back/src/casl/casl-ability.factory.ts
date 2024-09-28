import {
  createMongoAbility,
  MongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable, NotFoundException } from '@nestjs/common';
import { All } from 'src/classes/All';
import { createOrder } from 'src/classes/createOrder';
import { Customers } from 'src/classes/Customers';
import { Menu } from 'src/classes/Menu';
import { OrderHistory } from 'src/classes/OrderHistory';
import { Orders } from 'src/classes/Orders';
import { Role } from 'src/classes/Role';
import { Users } from 'src/classes/Users';
import { PrismaService } from 'src/prisma.service';

type Subjects = InferSubjects<
  | typeof All
  | typeof Customers
  | typeof Menu
  | typeof OrderHistory
  | typeof Orders
  | typeof Role
  | typeof Users
  | typeof createOrder
>;

export type AppAbility = MongoAbility<[AllowedActions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly prisma: PrismaService) {}

  async createForUser(user: {
    role: string;
    user: number;
    servantRoleId?: number;
    restaurantId?: number;
  }): Promise<AppAbility> {
    const { can, cannot, build } = new AbilityBuilder<
      MongoAbility<[AllowedActions, Subjects]>
    >(createMongoAbility);

    if (user.role === 'CUSTOMER') {
      can(AllowedActions.ORDER_HISTORY, OrderHistory, {
        customerId: user.user,
      });
      can(AllowedActions.CREATE_ORDER, createOrder);
    } else if (user.role === 'ADMIN') {
      can(AllowedActions.ALL, All, { restaurantId: user.restaurantId });
    } else if (user.role === 'SERVANT') {
      const servantRole = await this.prisma.servantRole.findUnique({
        where: { id: user.servantRoleId },
        select: { allowedActions: true },
      });
      if (!servantRole) {
        throw new NotFoundException('Role is not found');
      }

      const userCheck = await this.prisma.user.findUnique({
        where: { id: user.user },
      });

      if (servantRole.allowedActions.length > 0) {
        servantRole.allowedActions.forEach((action) => {
          switch (action) {
            case 'SEE_ORDERS':
              if (userCheck.active) {
                can(AllowedActions.SEE_ORDERS, Orders, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.SEE_ORDERS, Orders, {
                  restaurantId: user.restaurantId,
                });
              }
              break;
            case 'UPDATE_ORDERS':
              if (userCheck.active) {
                can(AllowedActions.UPDATE_ORDERS, Orders, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.UPDATE_ORDERS, Orders, {
                  restaurantId: user.restaurantId,
                });
              }

              break;

            case 'ADD_MENU':
              if (userCheck.active) {
                can(AllowedActions.ADD_MENU, Menu, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.ADD_MENU, Menu, {
                  restaurantId: user.restaurantId,
                });
              }

              break;
            case 'ADD_ROLE':
              if (userCheck.active) {
                can(AllowedActions.ADD_ROLE, Role, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.ADD_ROLE, Role, {
                  restaurantId: user.restaurantId,
                });
              }

              break;
            case 'UPDATE_ROLE':
              if (userCheck.active) {
                can(AllowedActions.UPDATE_ROLE, Role, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.UPDATE_ROLE, Role, {
                  restaurantId: user.restaurantId,
                });
              }
              break;
            case 'DELETE_ROLE':
              if (userCheck.active) {
                can(AllowedActions.DELETE_ROLE, Role, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.DELETE_ROLE, Role, {
                  restaurantId: user.restaurantId,
                });
              }

              break;
            case 'ADD_USER':
              if (userCheck.active) {
                can(AllowedActions.ADD_USER, Users, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.ADD_USER, Users, {
                  restaurantId: user.restaurantId,
                });
              }

              break;
            case 'UPDATE_USER':
              if (userCheck.active) {
                can(AllowedActions.UPDATE_USER, Users, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.UPDATE_USER, Users, {
                  restaurantId: user.restaurantId,
                });
              }
              break;
            case 'DELETE_USER':
              if (userCheck.active) {
                can(AllowedActions.DELETE_USER, Users, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.DELETE_USER, Users, {
                  restaurantId: user.restaurantId,
                });
              }

              break;
            case 'GET_USERS':
              if (userCheck.active) {
                can(AllowedActions.GET_USERS, Users, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.GET_USERS, Users, {
                  restaurantId: user.restaurantId,
                });
              }
            case 'GET_ROLES':
              if (userCheck.active) {
                can(AllowedActions.GET_ROLES, Role, {
                  restaurantId: user.restaurantId,
                });
              } else {
                cannot(AllowedActions.GET_ROLES, Role, {
                  restaurantId: user.restaurantId,
                });
              }

              break;
            default:
              console.log(`Unknown action: ${action}`);
              break;
          }
        });
      }
    }

    return build({
      detectSubjectType: (item: any) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
