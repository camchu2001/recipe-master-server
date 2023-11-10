import { Category } from '@prisma/client';
import { generateRandomInteger, generateRandomString } from '../../utils';
import {
    DatabaseError, createDatabaseError, prismaClient
} from '../../prisma';
import {
    Either, error, success
} from '../../types';

export const createCategory = async ( {
    id = generateRandomInteger(),
    name = generateRandomString(),
    description = 'Only the best food in the world',
    createdAt = new Date(),
    updatedAt = null
}: Partial<Category> ): Promise<Either<DatabaseError, Category>> => {
    let seededCategory: Category;

    try {
        seededCategory = await prismaClient.category.create( {
            data: {
                id,
                name,
                description,
                createdAt,
                updatedAt
            }
        } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( seededCategory );
};