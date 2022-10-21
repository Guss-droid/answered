import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { verify } from 'jsonwebtoken';

export interface IAuthUser {
  sub: string;
  email: string;
  isAdmin?: boolean;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): IAuthUser => {
    const req = context.switchToHttp().getRequest();
    const auth: string = req.headers['authorization'];
    const token = auth.replace('Bearer ', '');

    const payload = verify(token, process.env.TOKEN_SECRET);

    return { sub: payload.data.sub, email: payload.data.email };
  },
);
