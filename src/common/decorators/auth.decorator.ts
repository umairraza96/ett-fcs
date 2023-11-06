import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Auth = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    console.log(req.headers.authorization);
    return req.headers.authorization;
  },
);
