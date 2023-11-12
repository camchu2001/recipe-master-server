import { Category, Prisma } from '@prisma/client';
import {
    Either, error, success
} from '../../types';
import {
    DatabaseDuplicateKeyError,
    DatabaseError, DatabaseResourceNotFoundError, createDatabaseError, prismaClient
} from '../../prisma';
import { CategoryAlreadyExists, CategoryNotFound } from './categories.error';

export const getCategory = async (
    categoryId: Category['id']
): Promise<Either<DatabaseError | CategoryNotFound, Category>> => {
    let category: Category;

    try {
        category = await prismaClient.category.findUniqueOrThrow( { where: { id: categoryId } } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new CategoryNotFound() );
        }

        return error( databaseError );
    }

    return success( category );
};

export const createCategory = async (
    category: Prisma.CategoryCreateInput
): Promise<Either<DatabaseError | CategoryAlreadyExists, Category>> => {
    let newCategory: Category;

    try {
        newCategory = await prismaClient.category.create( { data: category } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseDuplicateKeyError ) {
            return error( new CategoryAlreadyExists() );
        }

        return error( databaseError );
    }

    return success( newCategory );
};