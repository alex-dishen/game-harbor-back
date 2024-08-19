import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocumentWithoutPassword } from 'schemas/user.schema';

export const GetUser = createParamDecorator(
  (
    data:
      | keyof UserDocumentWithoutPassword
      | [keyof UserDocumentWithoutPassword]
      | undefined,
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();

    if (!data) return request.user;

    if (typeof data === 'string') return request.user[data];

    const userValues = {};

    data.map((value) => (userValues[value] = request.user[value]));

    return userValues;
  },
);
