import express from 'express';
import { createRecipeHandler, getRecipeHandler } from './recipes.ctrl';
import { requestValidator } from '../../middleware';

export const recipeRouter = express.Router();

recipeRouter.get( '/:recipeId', requestValidator( 'GET_RECIPE' ), getRecipeHandler );
recipeRouter.post( '/', requestValidator( 'CREATE_RECIPE' ), createRecipeHandler );
