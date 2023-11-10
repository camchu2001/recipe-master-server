import * as UserSchema from '../../app/users/users.validation';
import * as RecipeSchema from '../../app/recipes/recipes.validation';
import * as CollectionSchema from '../../app/collections/collections.validation';
import * as RecipeCategorySchema from '../../app/recipesCategories/recipesCategories.validation';

export const SCHEMAS = {
    ...UserSchema,
    ...RecipeSchema,
    ...CollectionSchema,
    ...RecipeCategorySchema
};