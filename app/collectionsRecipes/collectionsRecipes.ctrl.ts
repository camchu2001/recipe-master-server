import { Response } from 'express';
import { CollectionRecipe } from '@prisma/client';
import { ResourceError } from '../../errors';
import { CreateCollectionRecipeRequest, GetCollectionRecipeRequest } from './collectionsRecipes.types';
import { createCollectionRecipe, getCollectionRecipe } from './collectionsRecipes.service';

export const getCollectionRecipeHandler = async (
    req: GetCollectionRecipeRequest,
    res: Response<ResourceError | CollectionRecipe>
): Promise<Response<ResourceError | CollectionRecipe>> => {
    const collectionRecipeId = Number( req.params.collectionRecipeId );

    const getCollectionRecipeResult = await getCollectionRecipe( collectionRecipeId );

    if ( getCollectionRecipeResult.isError() ) {
        return res
            .status( getCollectionRecipeResult.value.statusCode )
            .json( getCollectionRecipeResult.value );
    }

    return res
        .status( 200 )
        .json( getCollectionRecipeResult.value );
};

export const createCollectionRecipeHandler = async (
    req: CreateCollectionRecipeRequest,
    res: Response<ResourceError | CollectionRecipe>
): Promise<Response<ResourceError | CollectionRecipe>> => {
    const { collectionId, recipeId } = req.body;

    const createCollectionRecipeResult = await createCollectionRecipe( {
        collection: { connect: { id: collectionId } },
        recipe: { connect: { id: recipeId } }
    } );

    if ( createCollectionRecipeResult.isError() ) {
        return res
            .status( createCollectionRecipeResult.value.statusCode )
            .json( createCollectionRecipeResult.value );
    }

    return res
        .status( 201 )
        .json( createCollectionRecipeResult.value );
};