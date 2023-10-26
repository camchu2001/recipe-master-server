import Joi from 'joi';

export const GET_COLLECTION_RECIPE = Joi.object( { params: Joi.object( { collectionRecipeId: Joi.number() } ) } );

export const CREATE_COLLECTION_RECIPE = Joi.object( {
    body: Joi.object(
        {
            collectionId: Joi.number(),
            recipeId: Joi.number()
        }
    ).options( { presence: 'required' } )
        .required()
} );