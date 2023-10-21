import { Request } from 'express';

export interface GetRecipeRequest extends Request {
    params: {
        recipeId: string;
    };
}

export interface CreateRecipeRequest extends Request {
    body: {
        name: string;
        instructions: string;
        userId: number;
    };
}