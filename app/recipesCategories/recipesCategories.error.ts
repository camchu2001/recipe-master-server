import { ResourceError, ResourceNotFound } from '../../errors';

export class RecipeCategoryNotFound extends ResourceNotFound {
    public constructor () {
        const message = 'This requested recipe category was not found.';
        const code = 'RECIPE_CATEGORY_NOT_FOUND';
        const statusCode = 404;

        super( { message, code, statusCode } );
    }
}

export class RecipeCategoryAlreadyExists extends ResourceError {
    public constructor () {
        const message = 'This recipe category has already existed.';
        const code = 'RECIPE_CATEGORY_ALREADY_EXISTS';
        const statusCode = 400;

        super( { message, code, statusCode } );
    }
}