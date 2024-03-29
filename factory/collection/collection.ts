import { Collection } from '@prisma/client';
import { generateRandomInteger } from '../../utils';
import {
    DatabaseError, createDatabaseError, prismaClient
} from '../../prisma';
import {
    Either, error, success
} from '../../types';
import { PartialExcept } from '../../types/partialExcept';

export const createCollection = async ( {
    id = generateRandomInteger(),
    userId,
    name = 'My Collection',
    createdAt = new Date(),
    updatedAt = null
}: PartialExcept<Collection, 'userId'> ): Promise<Either<DatabaseError, Collection>> => {
    let seededCollection: Collection;

    try {
        seededCollection = await prismaClient.collection.create( {
            data: {
                id,
                userId,
                name,
                createdAt,
                updatedAt
            }
        } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( seededCollection );
};