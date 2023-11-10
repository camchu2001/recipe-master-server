import Joi from 'joi';

export const GET_CATEGORY = Joi.object( { params: Joi.object( { categoryId: Joi.number() } ) } );

export const CREATE_CATEGORY = Joi.object( {
    body: Joi.object(
        {
            name: Joi.string(),
            description: Joi.any()
        }
    ).options( { presence: 'required' } )
        .required()
} );