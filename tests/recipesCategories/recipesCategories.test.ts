import supertest from 'supertest';
import { app } from '../../server';
import { Factory } from '../../factory';
import {
    Category, Recipe, RecipeCategory
} from '@prisma/client';
import * as RecipeCategoryServiceModule from '../../app/recipesCategories/recipesCategories.service';

const server = app.listen();
const request = supertest( server );

afterAll( async () => {
    server.close();
} );

describe( 'GET /recipe-categories/recipeCategoryId', () => {
    describe( 'success flow', () => {
        let recipeCategory: RecipeCategory;

        beforeAll( async () => {
            const factory = new Factory();
            recipeCategory = await factory.getRecipeCategory();
        } );

        it( 'returns recipe category according to the provided recipeCategoryId', async () => {
            const getRecipeCategorySpy = jest.spyOn( RecipeCategoryServiceModule, 'getRecipeCategory' );

            const result = await request
                .get( `/recipes-categories/${ recipeCategory.id }` );

            expect( getRecipeCategorySpy ).toHaveBeenCalledTimes( 1 );
            expect( getRecipeCategorySpy ).toHaveBeenCalledWith( recipeCategory.id );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining(
                    {
                        id: recipeCategory.id,
                        recipeId: recipeCategory.recipeId,
                        categoryId: recipeCategory.categoryId
                    }
                )
            );
        } );
    } );

    describe( 'fail flow', () => {
        describe( 'recipe category with the provided id does not exist', () => {
            it( 'returns error recipe category not found', async () => {
                const getRecipeCategorySpy = jest.spyOn( RecipeCategoryServiceModule, 'getRecipeCategory' );

                const result = await request
                    .get( '/recipes-categories/-1' );

                expect( getRecipeCategorySpy ).toHaveBeenCalledTimes( 1 );
                expect( getRecipeCategorySpy ).toHaveBeenCalledWith( -1 );

                expect( result.status ).toBe( 404 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This requested recipe category was not found.',
                        code: 'RECIPE_CATEGORY_NOT_FOUND',
                        statusCode: 404
                    } )
                );
            } );
        } );
    } );
} );

describe( 'GET recipesCategories by collectionId', () => {
    describe( 'success flow', () => {
        let recipe: Recipe;
        let recipeCategory1: RecipeCategory;
        let recipeCategory2: RecipeCategory;

        beforeAll( async () => {
            const factory = new Factory();
            recipe = await factory.getRecipe();
            recipeCategory1 = await factory.getRecipeCategory( { recipeId: recipe.id } );
            recipeCategory2 = await factory.getRecipeCategory( { recipeId: recipe.id } );
        } );

        it( 'returns the categories with the given recipeId', async () => {
            const getRecipeCategoriesSpy = jest.spyOn( RecipeCategoryServiceModule, 'getRecipeCategories' );

            const result = await request
                .get( '/recipes-categories' )
                .query( { recipeId: recipe.id } );

            expect( getRecipeCategoriesSpy ).toHaveBeenCalledTimes( 1 );
            expect( getRecipeCategoriesSpy ).toHaveBeenCalledWith( { recipeId: recipe.id } );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.arrayContaining( [
                    expect.objectContaining(
                        {
                            id: recipeCategory1.id,
                            recipeId: recipeCategory1.recipeId,
                            categoryId: recipeCategory1.categoryId
                        }
                    ),
                    expect.objectContaining(
                        {
                            id: recipeCategory2.id,
                            recipeId: recipeCategory2.recipeId,
                            categoryId: recipeCategory2.categoryId
                        }
                    )
                ] )
            );
        } );
    } );

    describe( 'fail flow', () => {
        describe( 'there is no category with the provided recipeId', () => {
            it( 'returns an empty array', async () => {
                const getRecipeCategoriesSpy = jest.spyOn( RecipeCategoryServiceModule, 'getRecipeCategories' );

                const result = await request
                    .get( '/recipes-categories' )
                    .query( { recipeId: -1 } );

                expect( getRecipeCategoriesSpy ).toHaveBeenCalledTimes( 1 );
                expect( getRecipeCategoriesSpy ).toHaveBeenCalledWith( { recipeId: -1 } );

                expect( result.status ).toBe( 200 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( [] )
                );
            } );
        } );
    } );
} );

describe( 'POST /recipes-categories', () => {
    describe( 'success flow', () => {
        let recipe: Recipe;
        let category: Category;

        beforeAll( async () => {
            const factory = new Factory();
            recipe = await factory.getRecipe();
            category = await factory.getCategory();
        } );

        it( 'returns the newly created recipe category', async () => {
            const recipeCategoryInput = {
                recipeId: recipe.id,
                categoryId: category.id
            };

            const createRecipeCategorySpy = jest.spyOn( RecipeCategoryServiceModule, 'createRecipeCategory' );
            const result = await request
                .post( '/recipes-categories' )
                .send( recipeCategoryInput );

            expect( createRecipeCategorySpy ).toHaveBeenCalledTimes( 1 );
            expect( createRecipeCategorySpy ).toHaveBeenCalledWith( {
                recipe: { connect: { id: recipeCategoryInput.recipeId } },
                category: { connect: { id: recipeCategoryInput.categoryId } }
            } );
            expect( result.status ).toBe( 201 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining( {
                    recipeId: recipeCategoryInput.recipeId,
                    categoryId: recipeCategoryInput.categoryId
                } )
            );
        } );
    } );

    describe( 'fail flow', () => {
        describe( 'recipe category has already existed', () => {
            let recipeCategory: RecipeCategory;

            beforeAll( async () => {
                const factory = new Factory();
                recipeCategory = await factory.getRecipeCategory();
            } );

            it( 'returns error recipeCategory already existed', async () => {
                const recipeCategoryInput = {
                    recipeId: recipeCategory.recipeId,
                    categoryId: recipeCategory.categoryId
                };

                const createRecipeCategorySpy = jest.spyOn( RecipeCategoryServiceModule, 'createRecipeCategory' );
                const result = await request
                    .post( '/recipes-categories' )
                    .send( recipeCategoryInput );

                expect( createRecipeCategorySpy ).toHaveBeenCalledTimes( 1 );
                expect( createRecipeCategorySpy ).toHaveBeenCalledWith( {
                    recipe: { connect: { id: recipeCategoryInput.recipeId } },
                    category: { connect: { id: recipeCategoryInput.categoryId } }
                } );

                // expect( result.status ).toBe( 400 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This recipe category has already existed.',
                        code: 'RECIPE_CATEGORY_ALREADY_EXISTS',
                        statusCode: 400
                    } )
                );
            } );
        } );

        describe( 'recipeId does not exist', () => {
            let category: Category;

            beforeAll( async () => {
                const factory = new Factory();
                category = await factory.getCategory();
            } );

            it( 'returns recipe does not exist', async () => {
                const recipeCategoryInput = {
                    recipeId: -1,
                    categoryId: category.id
                };
                const createRecipeCategorySpy = jest.spyOn( RecipeCategoryServiceModule, 'createRecipeCategory' );
                const result = await request
                    .post( '/recipes-categories' )
                    .send( recipeCategoryInput );

                expect( createRecipeCategorySpy ).toHaveBeenCalledTimes( 1 );
                expect( createRecipeCategorySpy ).toHaveBeenCalledWith( {
                    recipe: { connect: { id: recipeCategoryInput.recipeId } },
                    category: { connect: { id: recipeCategoryInput.categoryId } }
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

        describe( 'categoryId does not exist', () => {
            let recipe: Recipe;

            beforeAll( async () => {
                const factory = new Factory();
                recipe = await factory.getRecipe();
            } );

            it( 'returns error category does not exist', async () => {
                const recipeCategoryInput = {
                    recipeId: recipe.id,
                    categoryId: -1
                };
                const createRecipeCategorySpy = jest.spyOn( RecipeCategoryServiceModule, 'createRecipeCategory' );
                const result = await request
                    .post( '/recipes-categories' )
                    .send( recipeCategoryInput );

                expect( createRecipeCategorySpy ).toHaveBeenCalledTimes( 1 );
                expect( createRecipeCategorySpy ).toHaveBeenCalledWith( {
                    recipe: { connect: { id: recipeCategoryInput.recipeId } },
                    category: { connect: { id: recipeCategoryInput.categoryId } }
                } );
                expect( result.status ).toBe( 404 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This requested category was not found.',
                        code: 'CATEGORY_NOT_FOUND',
                        statusCode: 404
                    } )
                );
            } );
        } );

    } );
} );