import { ResourceError, ResourceNotFound } from '../../errors';

export class CategoryNotFound extends ResourceNotFound {
    public constructor () {
        const message = 'This requested category was not found.';
        const code = 'CATEGORY_NOT_FOUND';
        const statusCode = 404;

        super( { message, code, statusCode } );
    }
}

export class CategoryAlreadyExists extends ResourceError {
    public constructor () {
        const message = 'This category has already existed.';
        const code = 'CATEGORY_ALREADY_EXISTS';
        const statusCode = 400;

        super( { message, code, statusCode } );
    }
}