import { Prisma } from '@prisma/client';
import { Request } from 'express';

export interface GetCategoryRequest extends Request {
    params: {
        categoryId: string;
    };
}

export interface CreateCategoryRequest extends Request {
    body: Prisma.CategoryCreateInput;
}