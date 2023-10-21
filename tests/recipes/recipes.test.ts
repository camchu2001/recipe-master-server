import supertest from 'supertest';
import { app } from '../../server';
import { Recipe } from '@prisma/client';
import { Factory } from '../../factory';
import * as RecipeServiceModule from '../../app/recipes/recipes.service';
import { generateRandomString } from '../../utils';

const server = app.listen();
const request = supertest( server );

afterAll( async () => {
    server.close();
} );

describe( 'GET /recipes/:recipeId', () => {
    describe( 'GET /recipes/:recipeId success flow', () => {
        let recipe: Recipe;

        beforeAll( async () => {
            const factory = new Factory();
            recipe = await factory.getRecipe( {
                name: generateRandomString(),
                instructions: 'Put frozen fries into air-fryer and fry for 20m at 400 F.'
            } );
        } );

        it( 'returns recipe according to the provided recipeId', async () => {
            const getRecipeSpy = jest.spyOn( RecipeServiceModule, 'getRecipe' );

            const result = await request
                .get( `/recipes/${ recipe.id }` );

            expect( getRecipeSpy ).toHaveBeenCalledTimes( 1 );
            expect( getRecipeSpy ).toHaveBeenCalledWith( recipe.id );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining(
                    {
                        id: recipe.id,
                        name: recipe.name,
                        instructions: recipe.instructions
                    }
                )
            );
        } );
    } );

    describe( 'GET /recipes/:recipeId fail flow', () => {
        describe( 'recipe with the provided id does not exist', () => {
            it( 'returns error recipe not found', async () => {
                const getRecipeSpy = jest.spyOn( RecipeServiceModule, 'getRecipe' );

                const result = await request
                    .get( '/recipes/-1' );

                expect( getRecipeSpy ).toHaveBeenCalledTimes( 1 );
                expect( getRecipeSpy ).toHaveBeenCalledWith( -1 );

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

describe( 'POST /recipes', () => {
    describe( 'POST /recipes success flow', () => {
        it( 'returns the newly created recipe', async () => {
            const recipeInput = {
                name: generateRandomString(),
                instructions: 'Mix a bunch of spices together until it tastes right'
            };

            const createRecipeSpy = jest.spyOn( RecipeServiceModule, 'createRecipe' );

            const result = await request
                .post( '/recipes' )
                .send( recipeInput );

            expect( createRecipeSpy ).toHaveBeenCalledTimes( 1 );
            expect( createRecipeSpy ).toHaveBeenCalledWith( {
                name: recipeInput.name,
                instructions: recipeInput.instructions
            } );

            expect( result.status ).toBe( 201 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining( {
                    name: recipeInput.name,
                    instructions: recipeInput.instructions
                } )
            );
        } );
    } );

    describe( 'POST /recipes fail flow', () => {
        describe( 'recipe has already exist', () => {
            let recipe: Recipe;

            beforeAll( async () => {
                const factory = new Factory();
                recipe = await factory.getRecipe( {
                    name: generateRandomString(),
                    instructions: 'Mix a bunch of spices together until it tastes right'
                } );
            } );

            it( 'returns error recipe already existed', async () => {
                const recipeInput = {
                    name: recipe.name,
                    instructions: recipe.instructions
                };

                const createRecipeSpy = jest.spyOn( RecipeServiceModule, 'createRecipe' );

                const result = await request
                    .post( '/recipes' )
                    .send( recipeInput );

                expect( createRecipeSpy ).toHaveBeenCalledTimes( 1 );
                expect( createRecipeSpy ).toHaveBeenCalledWith( {
                    name: recipe.name,
                    instructions: recipe.instructions
                } );

                expect( result.status ).toBe( 400 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This recipe has already existed.',
                        code: 'RECIPE_ALREADY_EXISTS',
                        statusCode: 400
                    } )
                );
            } );
        } );
    } );
} );