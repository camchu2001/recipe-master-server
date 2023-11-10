import Joi from 'joi';

export const GET_RECIPE_CATEGORY = Joi.object( { params: Joi.object( { recipeCategoryId: Joi.number() } ) } );

export const GET_RECIPE_CATEGORIES = Joi.object( {
    query: Joi.object( { recipeId: Joi.string() } )
        .required()
        .options( { presence: 'required' } )
} );

export const CREATE_RECIPE_CATEGORY = Joi.object( {
    body: Joi.object(
        {
            recipeId: Joi.number(),
            categoryId: Joi.number()
        }
    ).options( { presence: 'required' } )
        .required()
} );