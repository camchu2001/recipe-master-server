import { User } from '@prisma/client';
import { generateRandomInteger } from '../../utils';
import {
    DatabaseError, createDatabaseError, prismaClient
} from '../../prisma';
import {
    Either, error, success
} from '../../types';

export const createUser = async ( {
    id = generateRandomInteger(),
    firstName = 'Bunny',
    lastName = 'Rabbit',
    email = 'bunnyrabbit@gmail.com',
    createdAt = new Date(),
    updatedAt = null
}: Partial<User> ): Promise<Either<DatabaseError, User>> => {
    let seededUser: User;

    try {
        seededUser = await prismaClient.user.create( {
            data: {
                id,
                firstName,
                lastName,
                email,
                createdAt,
                updatedAt
            }
        } );
    } catch ( err ) {
        const databaseError = createDatabaseError( err );

        return error( databaseError );
    }

    return success( seededUser );
};