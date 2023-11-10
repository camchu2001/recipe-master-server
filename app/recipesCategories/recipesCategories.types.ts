import { Request } from 'express';

export interface GetRecipeCategoryRequest extends Request {
    params: {
        recipeCategoryId: string;
    };
}

export interface CreateRecipeCategoryRequest extends Request {
    body: {
        recipeId: number;
        categoryId: number;
    };
}