import { Collection, Prisma } from '@prisma/client';
import {
    CollectionAlreadyExists, CollectionNotFound, CreateCollectionUserNotFound
} from './collections.error';
import {
    Either, error, success
} from '../../types';
import {
    DatabaseDuplicateKeyError,
    DatabaseError, DatabaseResourceNotFoundError, createDatabaseError, prismaClient
} from '../../prisma';

export const getCollection = async (
    collectionId: Collection['id']
): Promise<Either<DatabaseError | CollectionNotFound, Collection>> => {
    let collection: Collection;

    try {
        collection = await prismaClient.collection.findUniqueOrThrow( { where: { id: collectionId } } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new CollectionNotFound() );
        }

        return error( databaseError );
    }

    return success( collection );
};

export const createCollection = async (
    collection: Prisma.CollectionCreateInput
): Promise<Either<DatabaseError | CollectionAlreadyExists, Collection>> => {
    let newCollection: Collection;

    try {
        newCollection = await prismaClient.collection.create( { data: collection } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseDuplicateKeyError ) {
            return error( new CollectionAlreadyExists() );
        }

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new CreateCollectionUserNotFound() );
        }

        return error( databaseError );
    }

    return success( newCollection );
};