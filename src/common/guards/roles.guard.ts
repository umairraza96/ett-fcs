import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userId = request.user;
    const userRole = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });
    return matchRoles(roles, userRole!.role);
  }
}

function matchRoles(roles: string[], userRole: Role): boolean {
  return roles.includes(userRole) ? true : false;
}
