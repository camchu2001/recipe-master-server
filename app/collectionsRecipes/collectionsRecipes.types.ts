import { Request } from 'express';

export interface GetCollectionRecipeRequest extends Request {
    params: {
        collectionRecipeId: string;
    };
}

export interface CreateCollectionRecipeRequest extends Request {
    body: {
        collectionId: number;
        recipeId: number;
    };
}