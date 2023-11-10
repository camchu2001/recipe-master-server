import { CollectionRecipe } from '@prisma/client';
import { generateRandomInteger } from '../../utils';
import { PartialExcept } from '../../types/partialExcept';
import {
    Either, error, success
} from '../../types';
import {
    DatabaseError, createDatabaseError, prismaClient
} from '../../prisma';

export const createCollectionRecipe = async ( {
    id = generateRandomInteger(),
    collectionId,
    recipeId,
    createdAt = new Date(),
    updatedAt = null
}: PartialExcept<CollectionRecipe, 'collectionId'| 'recipeId'> ): Promise<Either<DatabaseError, CollectionRecipe>> => {
    let seededCollectionRecipe: CollectionRecipe;

    try {
        seededCollectionRecipe = await prismaClient.collectionRecipe.create( {
            data: {
                id,
                collectionId,
                recipeId,
                createdAt,
                updatedAt
            }
        } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( seededCollectionRecipe );
};