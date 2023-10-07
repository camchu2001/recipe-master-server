import { ResourceError, ResourceNotFound } from '../../errors';

export class UserNotFound extends ResourceNotFound {
    public constructor () {
        const message = 'This requested user was not found.';
        const code = 'USER_NOT_FOUND';
        const statusCode = 404;

        super( { message, code, statusCode } );
    }
}

export class UserAlreadyExists extends ResourceError {
    public constructor () {
        const message = 'This user has already exists.';
        const code = 'USER_ALREADY_EXISTS';
        const statusCode = 400;

        super( { message, code, statusCode } );
    }
}
