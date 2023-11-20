import { generateRandomInteger } from '../../utils';
import { PartialExcept } from '../../types/partialExcept';
import {
    Either, error, success
} from '../../types';
import {
    DatabaseError, createDatabaseError, prismaClient
} from '../../prisma';
import { RecipeCategory } from '@prisma/client';

export const createRecipeCategory = async ( {
    id = generateRandomInteger(),
    recipeId,
    categoryId,
    createdAt = new Date(),
    updatedAt = null
}: PartialExcept<RecipeCategory, 'recipeId'| 'categoryId'> ): Promise<Either<DatabaseError, RecipeCategory>> => {
    let seededRecipeCategory: RecipeCategory;

    try {
        seededRecipeCategory = await prismaClient.recipeCategory.create( {
            data: {
                id,
                recipeId,
                categoryId,
                createdAt,
                updatedAt
            }
        } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( seededRecipeCategory );
};