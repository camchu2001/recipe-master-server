import { Response } from 'express';
import { User } from '@prisma/client';
import { createUser, getUser } from './users.service';
import { CreateUserRequest, GetUserRequest } from './users.types';
import { ResourceError } from '../../errors';

export const getUserHandler = async (
    req: GetUserRequest,
    res: Response<ResourceError | User>
): Promise<Response<ResourceError | User>> => {
    const userId = Number( req.params.userId );

    const getUserResult = await getUser( userId );

    if ( getUserResult.isError() ) {
        return res
            .status( getUserResult.value.statusCode )
            .json( getUserResult.value );
    }

    return res
        .status( 200 )
        .json( getUserResult.value );
};

export const createUserHandler = async (
    req: CreateUserRequest,
    res:  Response<ResourceError | User>
): Promise<Response<ResourceError | User>> => {
    const { firstName, lastName, email } = req.body;

    const createUserResult = await createUser( {
        firstName,
        lastName,
        email
    } );

    if ( createUserResult.isError() ) {
        return res
            .status( createUserResult.value.statusCode )
            .json( createUserResult.value );
    }

    return res
        .status( 201 )
        .json( createUserResult.value );
};