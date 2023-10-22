import {
    Collection, Recipe, User
} from '@prisma/client';
import { createUser } from './user';
import { createRecipe } from './recipe';
import { createCollection } from './collection';

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

    async getCollection (
        newCollection: Partial<Collection> = {}
    ): Promise<Collection> {
        const createCollectionResult = await createCollection( newCollection );

        if ( createCollectionResult.isError() ) {
            throw createCollectionResult.value;
        }

        return createCollectionResult.value;
    }
}