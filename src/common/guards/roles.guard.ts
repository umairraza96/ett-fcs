import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    try {
      const roles = this.reflector.get(Roles, context.getHandler());
      if (!roles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const userId = request.headers.authorization;
      const prisma = new PrismaService();
      const userRole = await prisma.user.findUnique({
        where: { id: userId },
      });
      return matchRoles(roles, userRole!.role);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}

function matchRoles(roles: string[], userRole: Role): boolean {
  return roles.includes(userRole) ? true : false;
}
