import Joi from 'joi';

export const GET_COLLECTION = Joi.object( { params: Joi.object( { collectionId: Joi.number() } ) } );

export const GET_COLLECTIONS = Joi.object( {
    query: Joi.object( { userId: Joi.string() } )
        .required()
        .options( { presence: 'required' } )
} );

export const CREATE_COLLECTION = Joi.object( {
    body: Joi.object(
        {
            userId: Joi.number(),
            name: Joi.string()
        }
    ).options( { presence: 'required' } )
        .required()
} );