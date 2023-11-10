import {
    Collection, CollectionRecipe, Recipe, User
} from '@prisma/client';
import { createUser } from './user';
import { createRecipe } from './recipe';
import { createCollection } from './collection';
import { createCollectionRecipe } from './collectionRecipe';

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

    async getCollectionRecipe (
        newCollectionRecipe: Partial<CollectionRecipe> = {}
    ): Promise<CollectionRecipe> {
        let collectionId = newCollectionRecipe.collectionId;
        let recipeId = newCollectionRecipe.recipeId;

        if ( !collectionId ) {
            const collection = await this.getCollection();
            collectionId = collection.id;
        }

        if ( !recipeId ) {
            const recipe = await this.getRecipe();
            recipeId = recipe.id;
        }

        const createCollectioRecipeResult = await createCollectionRecipe(
            { ...newCollectionRecipe, collectionId, recipeId }
        );

        if ( createCollectioRecipeResult.isError() ) {
            throw createCollectioRecipeResult.value;
        }

        return createCollectioRecipeResult.value;
    }
}