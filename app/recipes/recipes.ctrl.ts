import { Response } from 'express';
import { Recipe } from '@prisma/client';
import { ResourceError } from '../../errors';
import { CreateRecipeRequest, GetRecipeRequest } from './recipes.type';
import { createRecipe, getRecipe } from './recipes.service';

export const getRecipeHandler = async (
    req: GetRecipeRequest,
    res: Response<ResourceError | Recipe>
): Promise<Response<ResourceError | Recipe>> => {
    const recipeId = Number( req.params.recipeId );

    const getRecipeResult = await getRecipe( recipeId );

    if ( getRecipeResult.isError() ) {
        return res
            .status( getRecipeResult.value.statusCode )
            .json( getRecipeResult.value );
    }

    return res
        .status( 200 )
        .json( getRecipeResult.value );
};

export const createRecipeHandler = async (
    req: CreateRecipeRequest,
    res: Response<ResourceError | Recipe>
): Promise<Response<ResourceError | Recipe>> => {
    const { userId, name, instructions } = req.body;

    const createRecipeResult = await createRecipe( {
        user: { connect: { id: userId } },
        name,
        instructions
    } );

    if ( createRecipeResult.isError() ) {
        return res
            .status( createRecipeResult.value.statusCode )
            .json( createRecipeResult.value );
    }

    return res
        .status( 201 )
        .json( createRecipeResult.value );
};