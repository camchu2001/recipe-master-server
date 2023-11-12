import Joi from 'joi';

export const GET_RECIPE = Joi.object( { params: Joi.object( { recipeId: Joi.number() } ) } );

export const GET_RECIPES = Joi.object( {
    query: Joi.object( { userId: Joi.string() } )
        .required()
        .options( { presence: 'required' } )
} );

export const CREATE_RECIPE = Joi.object( {
    body: Joi.object(
        {
            userId: Joi.number(),
            name: Joi.string(),
            instructions: Joi.string()
        }
    ).options( { presence: 'required' } )
        .required()
} );