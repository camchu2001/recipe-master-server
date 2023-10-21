import { Prisma, RecipeCategory } from '@prisma/client';
import {
    DatabaseError, prismaClient,  createDatabaseError, DatabaseDuplicateKeyError
} from '../../prisma';
import { RecipeCategoryAlreadyExists } from './recipesCategories.error';
import {
    Either, error, success
} from '../../types';

export const createRecipeCategory = async (
    recipeCategory: Prisma.RecipeCategoryCreateInput
): Promise<Either<DatabaseError | RecipeCategoryAlreadyExists, RecipeCategory>> => {
    let newRecipeCategory: RecipeCategory;

    try {
        newRecipeCategory = await prismaClient.recipeCategory.create( { data: recipeCategory } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseDuplicateKeyError ) {
            return error( new RecipeCategoryAlreadyExists() );
        }

        return error( databaseError );
    }

    return success( newRecipeCategory );
};