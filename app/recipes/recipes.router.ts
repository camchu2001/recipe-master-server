import express from 'express';
import {
    createRecipeHandler, getRecipeHandler, getRecipesHandler
} from './recipes.ctrl';
import { requestValidator } from '../../middleware';

export const recipeRouter = express.Router();

recipeRouter.get( '/:recipeId', requestValidator( 'GET_RECIPE' ), getRecipeHandler );
recipeRouter.get( '/', requestValidator( 'GET_RECIPES' ), getRecipesHandler );
recipeRouter.post( '/', requestValidator( 'CREATE_RECIPE' ), createRecipeHandler );
