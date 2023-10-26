import { CollectionRecipe, Prisma } from '@prisma/client';
import {
    Either, error, success
} from '../../types';
import {
    DatabaseDuplicateKeyError,
    DatabaseError, DatabaseResourceNotFoundError, createDatabaseError, prismaClient
} from '../../prisma';
import { CollectionRecipeAlreadyExists, CollectionRecipeNotFound } from './collectionsRecipes.error';
import { CollectionNotFound } from '../collections/collections.error';
import { RecipeNotFound } from '../recipes/recipes.error';

export const getCollectionRecipe = async (
    collectionRecipeId: CollectionRecipe['id']
): Promise<Either<DatabaseError | CollectionRecipeNotFound, CollectionRecipe>> => {
    let collectionRecipe: CollectionRecipe;

    try {
        collectionRecipe = await prismaClient.collectionRecipe.findUniqueOrThrow(
            { where: { id: collectionRecipeId } }
        );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new CollectionRecipeNotFound() );
        }

        return error( databaseError );
    }

    return success( collectionRecipe );
};

export const createCollectionRecipe = async (
    collectionRecipe: Prisma.CollectionRecipeCreateInput
): Promise<Either<DatabaseError | CollectionRecipeAlreadyExists, CollectionRecipe>> => {
    let newCollectionRecipe: CollectionRecipe;

    try {
        newCollectionRecipe = await prismaClient.collectionRecipe.create( { data: collectionRecipe } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseDuplicateKeyError ) {
            return error( new CollectionRecipeAlreadyExists() );
        }

        if ( databaseError.error.message.includes( 'No \'Collection\' record(s)' ) ) {
            return error( new CollectionNotFound() );
        }

        if ( databaseError.error.message.includes( 'No \'Recipe\' record(s)' ) ) {
            return error( new RecipeNotFound() );
        }

        return error( databaseError );
    }

    return success( newCollectionRecipe );
};