import Joi from 'joi';

export const GET_USER = Joi.object( { params: Joi.object( { userId: Joi.number() } ) } );

export const CREATE_USER = Joi.object( {
    body: Joi.object(
        {
            firstName: Joi.string(),
            lastName: Joi.string(),
            email: Joi.string()
        }
    ).options( { presence: 'required' } )
        .required()
} );