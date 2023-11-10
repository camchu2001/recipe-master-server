import { Response } from 'express';
import { ResourceError } from '../../errors';
import { CreateRecipeCategoryRequest, GetRecipeCategoryRequest } from './recipesCategories.types';
import { RecipeCategory } from '@prisma/client';
import {
    createRecipeCategory, getRecipeCategories, getRecipeCategory
} from './recipesCategories.service';

export const getRecipeCategoryHandler = async (
    req: GetRecipeCategoryRequest,
    res: Response<ResourceError | RecipeCategory>
): Promise<Response<ResourceError | RecipeCategory>> => {
    const recipeCategoryId = Number( req.params.recipeCategoryId );

    const getRecipeCategoryResult = await getRecipeCategory( recipeCategoryId );

    if ( getRecipeCategoryResult.isError() ) {
        return res
            .status( getRecipeCategoryResult.value.statusCode )
            .json( getRecipeCategoryResult.value );
    }

    return res
        .status( 200 )
        .json( getRecipeCategoryResult.value );
};

export const getRecipeCategoriesHandler = async (
    req: GetRecipeCategoryRequest,
    res: Response<ResourceError | RecipeCategory[]>
): Promise<Response<ResourceError | RecipeCategory[]>> => {
    const { recipeId } = req.query;

    const getRecipeCategoriesResult = await getRecipeCategories( { recipeId: Number( recipeId ) } );

    if ( getRecipeCategoriesResult.isError() ) {
        return res
            .status( getRecipeCategoriesResult.value.statusCode )
            .json( getRecipeCategoriesResult.value );
    }

    return res
        .status( 200 )
        .json( getRecipeCategoriesResult.value );
};

export const createRecipeCategoryHandler = async (
    req: CreateRecipeCategoryRequest,
    res: Response<ResourceError | RecipeCategory>
): Promise<Response<ResourceError | RecipeCategory>> => {
    const { recipeId, categoryId } = req.body;

    const createRecipeCategoryResult = await createRecipeCategory( {
        recipe: { connect: { id: recipeId } },
        category: { connect: { id: categoryId } }
    } );

    if ( createRecipeCategoryResult.isError() ) {
        return res
            .status( createRecipeCategoryResult.value.statusCode )
            .json( createRecipeCategoryResult.value );
    }

    return res
        .status( 201 )
        .json( createRecipeCategoryResult.value );
};