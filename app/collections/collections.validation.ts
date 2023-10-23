import Joi from 'joi';

export const GET_COLLECTION = Joi.object( { params: Joi.object( { collectionId: Joi.number() } ) } );

export const CREATE_COLLECTION = Joi.object( {
    body: Joi.object(
        {
            userId: Joi.number(),
            name: Joi.string()
        }
    ).options( { presence: 'required' } )
        .required()
} );