import {
    Prisma, PrismaClient, User
} from '@prisma/client';
import {
    Either, error, success
} from '../../types';
import { UserAlreadyExists, UserNotFound } from './users.error';
import {
    DatabaseDuplicateKeyError, DatabaseError, DatabaseResourceNotFoundError
} from '../../prisma/prisma.errors';
import { createDatabaseError } from '../../prisma/prisma.helper';

const prisma = new PrismaClient();

export const getUser = async (
    userId: User['id']
): Promise<Either<DatabaseError | UserNotFound, User>> => {
    let user: User;

    try {
        user = await prisma.user.findUniqueOrThrow( { where: { id: userId } } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseResourceNotFoundError ) {
            return error( new UserNotFound() );
        }

        return error( databaseError );
    }

    return success( user );
};

export const createUser = async (
    user: Prisma.UserCreateInput
): Promise<Either<DatabaseError | UserAlreadyExists, User>> => {
    let newUser: User;

    try {
        newUser = await prisma.user.create( { data: user } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        if ( databaseError instanceof DatabaseDuplicateKeyError ) {
            return error( new UserAlreadyExists() );
        }

        return error( databaseError );
    }

    return success( newUser );
};