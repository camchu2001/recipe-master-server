import express from 'express';
import { createRecipeHandler, getRecipeHandler } from './recipes.ctrl';

export const recipeRouter = express.Router();

recipeRouter.get( '/:recipeId', getRecipeHandler );
recipeRouter.post( '/', createRecipeHandler );
