import supertest from 'supertest';
import { app } from '../../server';
import {
    Collection, CollectionRecipe, Recipe
} from '@prisma/client';
import { Factory } from '../../factory';
import * as CollectionRecipeServiceModule from './../../app/collectionsRecipes/collectionsRecipes.service';

const server = app.listen();
const request = supertest( server );

afterAll( async () => {
    server.close();
} );

describe( 'GET /collections-recipes/:collectionRecipeId', () => {
    describe( 'GET /collections-recipes/:collectionRecipeId success flow', () => {
        let collectionRecipe: CollectionRecipe;

        beforeAll( async () => {
            const factory = new Factory();
            collectionRecipe = await factory.getCollectionRecipe();
        } );

        it( 'returns collection recipe according to the provided collectionRecipeId', async () => {
            const getCollectionRecipeSpy = jest.spyOn( CollectionRecipeServiceModule, 'getCollectionRecipe' );

            const result = await request
                .get( `/collections-recipes/${ collectionRecipe.id }` );

            expect( getCollectionRecipeSpy ).toHaveBeenCalledTimes( 1 );
            expect( getCollectionRecipeSpy ).toHaveBeenCalledWith( collectionRecipe.id );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining(
                    {
                        id: collectionRecipe.id,
                        collectionId: collectionRecipe.collectionId,
                        recipeId: collectionRecipe.recipeId
                    }
                )
            );
        } );
    } );

    describe( 'GET /collections-recipes/:collectionRecipeId fail flow', () => {
        describe( 'collection recipe with the provided id does not exist', () => {
            it( 'returns error collection recipe not found', async () => {
                const getCollectionRecipeSpy = jest.spyOn( CollectionRecipeServiceModule, 'getCollectionRecipe' );

                const result = await request
                    .get( '/collections-recipes/-1' );

                expect( getCollectionRecipeSpy ).toHaveBeenCalledTimes( 1 );
                expect( getCollectionRecipeSpy ).toHaveBeenCalledWith( -1 );

                expect( result.status ).toBe( 404 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This requested collection recipe was not found.',
                        code: 'COLLECTION_RECIPE_NOT_FOUND',
                        statusCode: 404
                    } )
                );
            } );
        } );
    } );
} );

describe( 'GET /collectionRecipes by collectionId', () => {
    describe( 'GET /collectionRecipes by collectionId success flow', () => {
        let collection: Collection;
        let collectionRecipe1: CollectionRecipe;
        let collectionRecipe2: CollectionRecipe;

        beforeAll( async () => {
            const factory = new Factory();
            collection = await factory.getCollection();
            collectionRecipe1 = await factory.getCollectionRecipe( { collectionId: collection.id } );
            collectionRecipe2 = await factory.getCollectionRecipe( { collectionId: collection.id } );
        } );

        it( 'returns the collection(s) with the given userId', async () => {
            const getCollectionRecipesSpy = jest.spyOn( CollectionRecipeServiceModule, 'getCollectionRecipes' );

            const result = await request
                .get( '/collections-recipes' )
                .query( { collectionId: collection.id } );

            expect( getCollectionRecipesSpy ).toHaveBeenCalledTimes( 1 );
            expect( getCollectionRecipesSpy ).toHaveBeenCalledWith( { collectionId: collection.id } );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.arrayContaining( [
                    expect.objectContaining(
                        {
                            id: collectionRecipe1.id,
                            collectionId: collectionRecipe1.collectionId,
                            recipeId: collectionRecipe1.recipeId
                        }
                    ),
                    expect.objectContaining(
                        {
                            id: collectionRecipe2.id,
                            collectionId: collectionRecipe2.collectionId,
                            recipeId: collectionRecipe2.recipeId
                        }
                    )
                ] )
            );
        } );
    } );

    describe( 'GET /collections by userId fail flow', () => {
        describe( 'there is no collection with the provided userId', () => {
            it( 'returns an empty array', async () => {
                const getCollectionRecipesSpy = jest.spyOn( CollectionRecipeServiceModule, 'getCollectionRecipes' );

                const result = await request
                    .get( '/collections-recipes' )
                    .query( { collectionId: -1 } );

                expect( getCollectionRecipesSpy ).toHaveBeenCalledTimes( 1 );
                expect( getCollectionRecipesSpy ).toHaveBeenCalledWith( { collectionId: -1 } );

                expect( result.status ).toBe( 200 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( [] )
                );
            } );
        } );
    } );
} );

describe( 'POST /collections-recipes', () => {
    describe( 'POST /collections-recipes success flow', () => {
        let collection: Collection;
        let recipe: Recipe;

        beforeAll( async () => {
            const factory = new Factory();
            collection = await factory.getCollection();
            recipe = await factory.getRecipe();
        } );

        it( 'returns the newly created collection recipe', async () => {
            const collectionRecipeInput = {
                collectionId: collection.id,
                recipeId: recipe.id
            };
            const createCollectionRecipeSpy = jest.spyOn( CollectionRecipeServiceModule, 'createCollectionRecipe' );
            const result = await request
                .post( '/collections-recipes' )
                .send( collectionRecipeInput );

            expect( createCollectionRecipeSpy ).toHaveBeenCalledTimes( 1 );
            expect( createCollectionRecipeSpy ).toHaveBeenCalledWith( {
                collection: { connect: { id: collectionRecipeInput.collectionId } },
                recipe: { connect: { id: collectionRecipeInput.recipeId } }
            } );
            expect( result.status ).toBe( 201 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining( {
                    collectionId: collectionRecipeInput.collectionId,
                    recipeId: collectionRecipeInput.recipeId
                } )
            );
        } );
    } );

    describe( 'POST /collections-recipes fail flow', () => {
        describe( 'collection recipe has already exist', () => {
            let collectionRecipe: CollectionRecipe;

            beforeAll( async () => {
                const factory = new Factory();
                collectionRecipe = await factory.getCollectionRecipe();
            } );

            it( 'returns error collection already existed', async () => {
                const collectionRecipeInput = {
                    collectionId: collectionRecipe.collectionId,
                    recipeId: collectionRecipe.recipeId
                };
                const createCollectionRecipeSpy = jest.spyOn( CollectionRecipeServiceModule, 'createCollectionRecipe' );
                const result = await request
                    .post( '/collections-recipes' )
                    .send( collectionRecipeInput );

                expect( createCollectionRecipeSpy ).toHaveBeenCalledTimes( 1 );
                expect( createCollectionRecipeSpy ).toHaveBeenCalledWith( {
                    collection: { connect: { id: collectionRecipeInput.collectionId } },
                    recipe: { connect: { id: collectionRecipeInput.recipeId } }
                } );
                expect( result.status ).toBe( 400 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This collection recipe has already existed.',
                        code: 'COLLECTION_RECIPE_ALREADY_EXISTS',
                        statusCode: 400
                    } )
                );
            } );
        } );

        describe( 'collectionId does not exist', () => {
            let recipe: Recipe;

            beforeAll( async () => {
                const factory = new Factory();
                recipe = await factory.getRecipe();
            } );

            it( 'returns error collection already existed', async () => {
                const collectionRecipeInput = {
                    collectionId: -1,
                    recipeId: recipe.id
                };
                const createCollectionRecipeSpy = jest.spyOn( CollectionRecipeServiceModule, 'createCollectionRecipe' );
                const result = await request
                    .post( '/collections-recipes' )
                    .send( collectionRecipeInput );

                expect( createCollectionRecipeSpy ).toHaveBeenCalledTimes( 1 );
                expect( createCollectionRecipeSpy ).toHaveBeenCalledWith( {
                    collection: { connect: { id: collectionRecipeInput.collectionId } },
                    recipe: { connect: { id: collectionRecipeInput.recipeId } }
                } );
                expect( result.status ).toBe( 404 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This requested collection was not found.',
                        code: 'COLLECTION_NOT_FOUND',
                        statusCode: 404
                    } )
                );
            } );
        } );

        describe( 'recipeId does not exist', () => {
            let collection: Collection;

            beforeAll( async () => {
                const factory = new Factory();
                collection = await factory.getCollection();
            } );

            it( 'returns error collection already existed', async () => {
                const collectionRecipeInput = {
                    collectionId: collection.id,
                    recipeId: -1
                };
                const createCollectionRecipeSpy = jest.spyOn( CollectionRecipeServiceModule, 'createCollectionRecipe' );
                const result = await request
                    .post( '/collections-recipes' )
                    .send( collectionRecipeInput );

                expect( createCollectionRecipeSpy ).toHaveBeenCalledTimes( 1 );
                expect( createCollectionRecipeSpy ).toHaveBeenCalledWith( {
                    collection: { connect: { id: collectionRecipeInput.collectionId } },
                    recipe: { connect: { id: collectionRecipeInput.recipeId } }
                } );
                expect( result.status ).toBe( 404 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This requested recipe was not found.',
                        code: 'RECIPE_NOT_FOUND',
                        statusCode: 404
                    } )
                );
            } );
        } );
    } );
} );