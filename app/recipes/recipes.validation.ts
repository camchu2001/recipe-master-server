import Joi from 'joi';

export const GET_RECIPE = Joi.object( { params: Joi.object( { recipeId: Joi.number() } ) } );

export const CREATE_RECIPE = Joi.object( {
    body: Joi.object(
        {
            name: Joi.string(),
            instructions: Joi.string()
        }
    ).options( { presence: 'required' } )
        .required()
} );