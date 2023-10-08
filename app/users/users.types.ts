import { Prisma } from '@prisma/client';
import { Request } from 'express';

export interface GetUserRequest extends Request {
    params: {
        userId: string;
    };
}

export interface CreateUserRequest extends Request {
    body: Prisma.UserCreateInput;
}