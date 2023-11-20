import {
    Category, Collection, Recipe, RecipeCategory, User
} from '@prisma/client';
import { createUser } from './user';
import { createRecipe } from './recipe';
import { createCategory } from './category';
import { createCollection } from './collection';
import { createRecipeCategory } from './recipeCategory/recipeCategory';

export class Factory {
    async getUser (
        newUser: Partial<User> = {}
    ): Promise<User> {
        const createUserResult = await createUser( newUser );

        if ( createUserResult.isError() ) {
            throw createUserResult.value;
        }

        return createUserResult.value;
    }

    async getRecipe (
        newRecipe: Partial<Recipe> = {}
    ): Promise<Recipe> {
        let userId = newRecipe.userId;

        if ( !userId ) {
            const user = await this.getUser();
            userId = user.id;
        }

        const createRecipeResult = await createRecipe( { ...newRecipe, userId } );

        if ( createRecipeResult.isError() ) {
            throw createRecipeResult.value;
        }

        return createRecipeResult.value;
    }

    async getCollection (
        newCollection: Partial<Collection> = {}
    ): Promise<Collection> {
        let userId = newCollection.userId;

        if ( !userId ) {
            const user = await this.getUser();
            userId = user.id;
        }

        const createCollectionResult = await createCollection( { ...newCollection, userId } );

        if ( createCollectionResult.isError() ) {
            throw createCollectionResult.value;
        }

        return createCollectionResult.value;
    }

    async getCategory (
        newCategory: Partial<Category> = {}
    ): Promise<Category> {
        const createCategoryResult = await createCategory( newCategory );

        if ( createCategoryResult.isError() ) {
            throw createCategoryResult.value;
        }

        return createCategoryResult.value;
    }

    async getRecipeCategory (
        newRecipeCategory: Partial<RecipeCategory> = {}
    ): Promise<RecipeCategory> {
        let recipeId = newRecipeCategory.recipeId;
        let categoryId = newRecipeCategory.categoryId;

        if ( !recipeId ) {
            const recipe = await this.getRecipe();
            recipeId = recipe.id;
        }

        if ( !categoryId ) {
            const category = await this.getCategory();
            categoryId = category.id;
        }

        const createRecipeCategoryResult = await createRecipeCategory(
            { ...newRecipeCategory, recipeId, categoryId }
        );

        if ( createRecipeCategoryResult.isError() ) {
            throw createRecipeCategoryResult.value;
        }

        return createRecipeCategoryResult.value;
    }
}