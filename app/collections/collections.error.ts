import { ResourceError, ResourceNotFound } from '../../errors';

export class CollectionNotFound extends ResourceNotFound {
    public constructor () {
        const message = 'This requested collection was not found.';
        const code = 'COLLECTION_NOT_FOUND';
        const statusCode = 404;

        super( { message, code, statusCode } );
    }
}

export class CollectionAlreadyExists extends ResourceError {
    public constructor () {
        const message = 'This collection has already existed.';
        const code = 'COLLECTION_ALREADY_EXISTS';
        const statusCode = 400;

        super( { message, code, statusCode } );
    }
}
