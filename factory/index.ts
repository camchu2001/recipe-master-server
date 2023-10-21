import {
    Category, Recipe, User
} from '@prisma/client';
import { createUser } from './user';
import { createRecipe } from './recipe';
import { createCategory } from './category';

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
        const createRecipeResult = await createRecipe( newRecipe );

        if ( createRecipeResult.isError() ) {
            throw createRecipeResult.value;
        }

        return createRecipeResult.value;
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
}