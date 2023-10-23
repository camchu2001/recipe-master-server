import { ResourceError, ResourceNotFound } from '../../errors';

export class RecipeNotFound extends ResourceNotFound {
    public constructor () {
        const message = 'This requested recipe was not found.';
        const code = 'RECIPE_NOT_FOUND';
        const statusCode = 404;

        super( { message, code, statusCode } );
    }
}

export class RecipeAlreadyExists extends ResourceError {
    public constructor () {
        const message = 'This recipe has already existed.';
        const code = 'RECIPE_ALREADY_EXISTS';
        const statusCode = 400;

        super( { message, code, statusCode } );
    }
}

export class CreateRecipeUserNotFound extends ResourceNotFound {
    public constructor () {
        const message = 'This user was not found.';
        const code = 'CREATE_RECIPE_USER_NOT_FOUND';
        const statusCode = 404;

        super( { message, code, statusCode } );
    }
}