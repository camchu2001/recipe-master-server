import { Prisma } from '@prisma/client';
import { Request } from 'express';

export interface GetRecipeRequest extends Request {
    params: {
        recipeId: string;
    };
}

export interface CreateRecipeRequest extends Request {
    body: Prisma.RecipeCreateInput;
}