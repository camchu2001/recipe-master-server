import supertest from 'supertest';
import { app } from '../../server';
import { Factory } from '../../factory';
import { Category } from '@prisma/client';
import { generateRandomString } from '../../utils';
import * as CategoryServiceModule from '../../app/categories/categories.service';

const server = app.listen();
const request = supertest( server );

afterAll( async () => {
    server.close();
} );

describe( 'GET /categories/:categoryId', () => {
    describe( 'success flow', () => {
        let category: Category;

        beforeAll( async () => {
            const factory = new Factory();
            category = await factory.getCategory();
        } );

        it( 'returns category according to the provided categoryId', async () => {
            const getCategory = jest.spyOn( CategoryServiceModule, 'getCategory' );

            const result = await request
                .get( `/categories/${ category.id }` );

            expect( getCategory ).toHaveBeenCalledTimes( 1 );
            expect( getCategory ).toHaveBeenCalledWith( category.id );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining(
                    {
                        id: category.id,
                        name: category.name,
                        description: category.description
                    }
                )
            );
        } );
    } );

    describe( 'fail flow', () => {
        describe( 'category with the provided id does not exist', () => {
            it( 'returns error category not found', async () => {
                const getCategory = jest.spyOn( CategoryServiceModule, 'getCategory' );

                const result = await request
                    .get( '/categories/-1' );

                expect( getCategory ).toHaveBeenCalledTimes( 1 );
                expect( getCategory ).toHaveBeenCalledWith( -1 );

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


describe( 'POST /categories', () => {
    describe( 'success flow', () => {
        it( 'returns the newly created category', async () => {
            const categoryInput = {
                name: generateRandomString(),
                description: generateRandomString()
            };

            const createCategorySpy = jest.spyOn( CategoryServiceModule, 'createCategory' );

            const result = await request
                .post( '/categories' )
                .send( categoryInput );

            expect( createCategorySpy ).toHaveBeenCalledTimes( 1 );
            expect( createCategorySpy ).toHaveBeenCalledWith( {
                name: categoryInput.name,
                description: categoryInput.description
            } );

            expect( result.status ).toBe( 201 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining( {
                    name: categoryInput.name,
                    description: categoryInput.description
                } )
            );
        } );
    } );

    describe( 'fail flow', () => {
        describe( 'category has already existed', () => {
            let category: Category;

            beforeAll( async () => {
                const factory = new Factory();
                category = await factory.getCategory();
            } );

            it( 'returns error category already existed', async () => {
                const categoryInput = {
                    name: category.name,
                    description: category.description
                };

                const createCategorySpy = jest.spyOn( CategoryServiceModule, 'createCategory' );

                const result = await request
                    .post( '/categories' )
                    .send( categoryInput );

                expect( createCategorySpy ).toHaveBeenCalledTimes( 1 );
                expect( createCategorySpy ).toHaveBeenCalledWith( {
                    name: category.name,
                    description: category.description
                } );

                expect( result.status ).toBe( 400 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This category has already existed.',
                        code: 'CATEGORY_ALREADY_EXISTS',
                        statusCode: 400
                    } )
                );
            } );
        } );
    } );
} );
