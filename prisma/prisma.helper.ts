import { Prisma } from '@prisma/client';
import {
    DatabaseError,
    DatabaseDuplicateKeyError,
    DatabaseResourceNotFoundError
} from './prisma.errors';

export const createDatabaseError = (
    newError: unknown
): DatabaseError => {
    const error = newError as Error;

    if ( error instanceof Prisma.PrismaClientKnownRequestError ) {
        if ( error.code === 'P2002' ) return new DatabaseDuplicateKeyError( error );
        if ( error.code === 'P2025' ) return new DatabaseResourceNotFoundError( error );
    }

    return new DatabaseError( { error } );
};