import supertest from 'supertest';
import { app } from '../../server';
import { Collection, User } from '@prisma/client';
import { Factory } from '../../factory';
import * as CollectionServiceModule from '../../app/collections/collections.service';
import { generateRandomString } from '../../utils';

const server = app.listen();
const request = supertest( server );

afterAll( async () => {
    server.close();
} );

describe( 'GET /collections/:collectionId', () => {
    describe( 'GET /collections/:collectionId success flow', () => {
        let collection: Collection;

        beforeAll( async () => {
            const factory = new Factory();
            collection = await factory.getCollection();
        } );

        it( 'returns collection according to the provided collectionId', async () => {
            const getCollectionSpy = jest.spyOn( CollectionServiceModule, 'getCollection' );

            const result = await request
                .get( `/collections/${ collection.id }` );

            expect( getCollectionSpy ).toHaveBeenCalledTimes( 1 );
            expect( getCollectionSpy ).toHaveBeenCalledWith( collection.id );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining(
                    {
                        id: collection.id,
                        userId: collection.userId,
                        name: collection.name
                    }
                )
            );
        } );
    } );

    describe( 'GET /collection/:collectionId fail flow', () => {
        describe( 'collection with the provided id does not exist', () => {
            it( 'returns error collection not found', async () => {
                const getCollectionSpy = jest.spyOn( CollectionServiceModule, 'getCollection' );

                const result = await request
                    .get( '/collections/-1' );

                expect( getCollectionSpy ).toHaveBeenCalledTimes( 1 );
                expect( getCollectionSpy ).toHaveBeenCalledWith( -1 );

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
    } );
} );

describe( 'GET /collections by userId', () => {
    describe( 'GET /collections by userId success flow', () => {
        let collection1: Collection;
        let collection2: Collection;
        let user: User;

        beforeAll( async () => {
            const factory = new Factory();
            user = await factory.getUser();
            collection1 = await factory.getCollection(
                {
                    userId: user.id,
                    name: 'Collection 1'
                }
            );
            collection2 = await factory.getCollection(
                {
                    userId: user.id,
                    name: 'Collection 2'
                }
            );
        } );

        it( 'returns the collection(s) with the given userId', async () => {
            const getCollectionsSpy = jest.spyOn( CollectionServiceModule, 'getCollections' );

            const result = await request
                .get( '/collections' )
                .query( { userId: user.id } );

            expect( getCollectionsSpy ).toHaveBeenCalledTimes( 1 );
            expect( getCollectionsSpy ).toHaveBeenCalledWith( { userId: user.id } );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.arrayContaining( [
                    expect.objectContaining(
                        {
                            id: collection1.id,
                            userId: collection1.userId,
                            name: collection1.name
                        }
                    ),
                    expect.objectContaining(
                        {
                            id: collection2.id,
                            userId: collection2.userId,
                            name: collection2.name
                        }
                    )
                ] )
            );
        } );
    } );

    describe( 'GET /collections by userId fail flow', () => {
        describe( 'there is no collection with the provided userId', () => {
            it( 'returns an empty array', async () => {
                const getCollectionsSpy = jest.spyOn( CollectionServiceModule, 'getCollections' );

                const result = await request
                    .get( '/collections' )
                    .query( { userId: -1 } );

                expect( getCollectionsSpy ).toHaveBeenCalledTimes( 1 );
                expect( getCollectionsSpy ).toHaveBeenCalledWith( { userId: -1 } );

                expect( result.status ).toBe( 200 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( [] )
                );
            } );
        } );
    } );
} );

describe( 'POST /collections', () => {
    describe( 'POST /collections success flow', () => {
        let user: User;

        beforeAll( async () => {
            const factory = new Factory();
            user = await factory.getUser( );
        } );

        it( 'returns the newly created collection', async () => {
            const collectionInput = {
                userId: user.id,
                name: generateRandomString()
            };

            const createCollectionSpy = jest.spyOn( CollectionServiceModule, 'createCollection' );

            const result = await request
                .post( '/collections' )
                .send( collectionInput );

            expect( createCollectionSpy ).toHaveBeenCalledTimes( 1 );
            expect( createCollectionSpy ).toHaveBeenCalledWith( {
                user: { connect: { id: collectionInput.userId } },
                name: collectionInput.name
            } );

            expect( result.status ).toBe( 201 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining( {
                    userId: collectionInput.userId,
                    name: collectionInput.name
                } )
            );
        } );
    } );

    describe( 'POST /collection fail flow', () => {
        describe( 'collection has already exist', () => {
            let collection: Collection;

            beforeAll( async () => {
                const factory = new Factory();
                collection = await factory.getCollection();
            } );

            it( 'returns error collection already existed', async () => {
                const collectionInput = {
                    userId: collection.userId,
                    name: collection.name
                };

                const createCollectionSpy = jest.spyOn( CollectionServiceModule, 'createCollection' );

                const result = await request
                    .post( '/collections' )
                    .send( collectionInput );

                expect( createCollectionSpy ).toHaveBeenCalledTimes( 1 );
                expect( createCollectionSpy ).toHaveBeenCalledWith( {
                    user: { connect: { id: collectionInput.userId } },
                    name: collectionInput.name
                } );

                expect( result.status ).toBe( 400 );
                expect( result.body ).toStrictEqual(
                    expect.objectContaining( {
                        message: 'This collection has already existed.',
                        code: 'COLLECTION_ALREADY_EXISTS',
                        statusCode: 400
                    } )
                );
            } );
        } );
    } );
} );