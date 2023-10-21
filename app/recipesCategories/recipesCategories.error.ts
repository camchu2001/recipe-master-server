import { ResourceError } from '../../errors';

export class RecipeCategoryAlreadyExists extends ResourceError {
    public constructor () {
        const message = 'This recipe category has already existed.';
        const code = 'RECIPE_CATEGORY_ALREADY_EXISTS';
        const statusCode = 400;

        super( { message, code, statusCode } );
    }
}