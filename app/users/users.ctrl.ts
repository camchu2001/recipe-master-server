import { createUser, getUserById } from './users.service';


export const getUserHandler = async ( req: any, res: any ): Promise<any> => {
    const userId = Number( req.params.userId );

    const getUserByIdResult = await getUserById( userId );

    if ( !getUserByIdResult ) {
        res.status( 404 ).json( { message: 'User not found' } );
    }

    res.status( 200 ).json( getUserByIdResult );
};

export const createUserHandler = async ( req: any, res: any ): Promise<any> => {
    const { firstName, lastName, email } = req.body;

    const createUserResult = await createUser( {
        firstName,
        lastName,
        email
    } );

    res.status( 201 ).json( createUserResult );
};