import { Prisma, RecipeCategory } from '@prisma/client';
import {
    DatabaseError, prismaClient,  createDatabaseError, DatabaseDuplicateKeyError, DatabaseResourceNotFoundError
} from '../../prisma';
import { RecipeCategoryAlreadyExists, RecipeCategoryNotFound } from './recipesCategories.error';
import {
    Either, error, success
} from '../../types';
import { RecipeNotFound } from '../recipes/recipes.error';

export const getRecipeCategory = async (
    recipeCategoryId: RecipeCategory['id']
): Promise<Either<DatabaseError | RecipeCategoryNotFound, RecipeCategory>> => {
    let recipeCategory: RecipeCategory;

    try {
        recipeCategory = await prismaClient.recipeCategory.findUniqueOrThrow( { where: { id: recipeCategoryId } } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new RecipeCategoryNotFound() );
        }

        return error( databaseError );
    }

    return success( recipeCategory );
};

export const getRecipeCategories = async (
    getRecipeCategoriesParams: Prisma.RecipeCategoryWhereInput
): Promise<Either<DatabaseError, RecipeCategory[]>> => {
    let recipeCategories: RecipeCategory[];

    try {
        recipeCategories = await prismaClient.recipeCategory.findMany( { where: { ...getRecipeCategoriesParams } } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( recipeCategories );
};

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

        if ( databaseError.error.message.includes( 'No \'Recipe\' record(s)' ) ) {
            return error( new RecipeNotFound() );
        }

        return error( databaseError );
    }

    return success( newRecipeCategory );
};