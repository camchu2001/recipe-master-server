import { ResourceError, ResourceNotFound } from '../../errors';

export class CollectionRecipeNotFound extends ResourceNotFound {
    public constructor () {
        const message = 'This requested collection recipe was not found.';
        const code = 'COLLECTION_RECIPE_NOT_FOUND';
        const statusCode = 404;

        super( { message, code, statusCode } );
    }
}

export class CollectionRecipeAlreadyExists extends ResourceError {
    public constructor () {
        const message = 'This collection recipe has already existed.';
        const code = 'COLLECTION_RECIPE_ALREADY_EXISTS';
        const statusCode = 400;

        super( { message, code, statusCode } );
    }
}
