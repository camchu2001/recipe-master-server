import express from 'express';
import { requestValidator } from '../../middleware';
import {
    createRecipeCategoryHandler, getRecipeCategoriesHandler, getRecipeCategoryHandler
} from './recipesCategories.ctrl';

export const recipeCategoryRouter = express.Router();

recipeCategoryRouter.get( '/:recipeCategoryId', requestValidator( 'GET_RECIPE_CATEGORY' ), getRecipeCategoryHandler );
recipeCategoryRouter.get( '/', requestValidator( 'GET_RECIPE_CATEGORIES' ), getRecipeCategoriesHandler );
recipeCategoryRouter.post( '/', requestValidator( 'CREATE_RECIPE_CATEGORY' ), createRecipeCategoryHandler );
