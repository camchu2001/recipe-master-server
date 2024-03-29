import { Prisma, Recipe } from '@prisma/client';
import {
    DatabaseDuplicateKeyError,
    DatabaseError,
    DatabaseResourceNotFoundError,
    createDatabaseError,
    prismaClient
} from '../../prisma';
import {
    Either, error, success
} from '../../types';
import { RecipeAlreadyExists, RecipeNotFound } from './recipes.error';
import { UserNotFound } from '../users';

export const getRecipe = async (
    recipeId: Recipe['id']
): Promise<Either<DatabaseError | RecipeNotFound, Recipe>> => {
    let recipe: Recipe;

    try {
        recipe = await prismaClient.recipe.findUniqueOrThrow( { where: { id: recipeId } } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new RecipeNotFound() );
        }

        return error( databaseError );
    }

    return success( recipe );
};

export const createRecipe = async (
    recipe: Prisma.RecipeCreateInput
): Promise<Either<DatabaseError | RecipeAlreadyExists, Recipe>> => {
    let newRecipe: Recipe;

    try {
        newRecipe = await prismaClient.recipe.create( { data: recipe } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseDuplicateKeyError ) {
            return error( new RecipeAlreadyExists() );
        }

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new UserNotFound() );
        }

        return error( databaseError );
    }

    return success( newRecipe );
};