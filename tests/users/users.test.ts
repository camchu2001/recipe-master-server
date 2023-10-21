import { User } from '@prisma/client';
import { Factory } from '../../factory';
import supertest from 'supertest';
import { app } from '../../server';
import * as UserServiceModule from '../../app/users/users.service';
import { generateRandomString } from '../../utils';

const server = app.listen();
const request = supertest( server );

afterAll( async () => {
    server.close();
} );

describe( 'GET /users/:userId', () => {
    describe( 'GET /users/:userId success flow', () => {
        let user: User;

        beforeAll( async () => {
            const factory = new Factory();
            user = await factory.getUser( {
                firstName: 'Abigail',
                lastName: 'Amber',
                email: generateRandomString() + 'gmail.com'
            } );
        } );

        it( 'returns user according to the provided userId', async () => {
            const getUserSpy = jest.spyOn( UserServiceModule, 'getUser' );

            const result = await request
                .get( `/users/${ user.id }` );

            expect( getUserSpy ).toHaveBeenCalledTimes( 1 );
            expect( getUserSpy ).toHaveBeenCalledWith( user.id );

            expect( result.status ).toBe( 200 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining(
                    {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }
                )
            );
        } );
    } );

    describe( 'GET /users/:userId fail flow', () => {
        describe( 'user with the provided id does not exist', () => {
            it( 'returns error user not found', async () => {
                const getUserSpy = jest.spyOn( UserServiceModule, 'getUser' );

                const result = await request
                    .get( '/users/-1' );

                expect( getUserSpy ).toHaveBeenCalledTimes( 1 );
                expect( getUserSpy ).toHaveBeenCalledWith( -1 );

                expect( result.status ).toBe( 404 );
                expect( result.body ).toStrictEqual( {
                    message: 'This requested user was not found.',
                    code: 'USER_NOT_FOUND',
                    statusCode: 404
                } );
            } );
        } );
    } );
} );


describe( 'POST /users', () => {
    describe( 'POST /users success flow', () => {
        it( 'returns the newly created user', async () => {
            const userInput = {
                firstName: 'Hello',
                lastName: 'World',
                email: generateRandomString() + '@gmail.com'
            };

            const createUserSpy = jest.spyOn( UserServiceModule, 'createUser' );

            const result = await request
                .post( '/users' )
                .send( userInput );

            expect( createUserSpy ).toHaveBeenCalledTimes( 1 );
            expect( createUserSpy ).toHaveBeenCalledWith(
                {
                    firstName: userInput.firstName,
                    lastName: userInput.lastName,
                    email: userInput.email
                }
            );

            expect( result.status ).toBe( 201 );
            expect( result.body ).toStrictEqual(
                expect.objectContaining(
                    {
                        firstName: userInput.firstName,
                        lastName: userInput.lastName,
                        email: userInput.email
                    }
                )
            );
        } );
    } );

    describe( 'POST /users fail flow', () => {
        describe( 'user has already exist', () => {
            let user: User;

            beforeAll( async () => {
                const factory = new Factory();
                user = await factory.getUser( {
                    firstName: 'Abigail',
                    lastName: 'Abigail',
                    email: generateRandomString() + '@gmail.com'
                } );
            } );

            it( 'returns error user already existed', async () => {
                const userInput = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };

                const createUserSpy = jest.spyOn( UserServiceModule, 'createUser' );

                const result = await request
                    .post( '/users' )
                    .send( userInput );

                expect( createUserSpy ).toHaveBeenCalledTimes( 1 );
                expect( createUserSpy ).toHaveBeenCalledWith(
                    {
                        firstName: userInput.firstName,
                        lastName: userInput.lastName,
                        email: userInput.email
                    }
                );

                expect( result.status ).toBe( 400 );
                expect( result.body ).toStrictEqual( {
                    message: 'This user has already existed.',
                    code: 'USER_ALREADY_EXISTS',
                    statusCode: 400
                } );
            } );
        } );
    } );
} );
