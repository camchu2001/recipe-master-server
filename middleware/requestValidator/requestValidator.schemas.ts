import * as UserSchema from '../../app/users/users.validation';
import * as RecipeSchema from '../../app/recipes/recipes.validation';

export const SCHEMAS = {
    ...UserSchema,
    ...RecipeSchema
};