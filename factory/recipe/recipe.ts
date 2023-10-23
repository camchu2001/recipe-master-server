import { Recipe } from '@prisma/client';
import { generateRandomInteger, generateRandomString } from '../../utils';
import {
    DatabaseError, createDatabaseError, prismaClient
} from '../../prisma';
import {
    Either, error, success
} from '../../types';
import { PartialExcept } from '../../types/partialExcept';

export const createRecipe = async ( {
    id = generateRandomInteger(),
    userId,
    name = generateRandomString(),
    instructions = generateRandomString(),
    createdAt = new Date(),
    updatedAt = null
}: PartialExcept<Recipe, 'userId'> ): Promise<Either<DatabaseError, Recipe>> => {
    let seededRecipe: Recipe;

    try {
        seededRecipe = await prismaClient.recipe.create( {
            data: {
                id,
                userId,
                name,
                instructions,
                createdAt,
                updatedAt
            }
        } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( seededRecipe );
};