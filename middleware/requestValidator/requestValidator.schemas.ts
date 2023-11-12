import * as UserSchema from '../../app/users/users.validation';
import * as RecipeSchema from '../../app/recipes/recipes.validation';
import * as CollectionSchema from '../../app/collections/collections.validation';
import * as CategorySchema from '../../app/categories/categories.validation';

export const SCHEMAS = {
    ...UserSchema,
    ...RecipeSchema,
    ...CollectionSchema,
    ...CategorySchema
};