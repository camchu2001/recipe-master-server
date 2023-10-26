import express from 'express';
import { requestValidator } from '../../middleware';
import {
    createCollectionRecipeHandler, getCollectionRecipeHandler, getCollectionRecipesHandler
} from './collectionsRecipes.ctrl';

export const collectionRecipeRouter = express.Router();

collectionRecipeRouter.get( '/:collectionRecipeId', requestValidator( 'GET_COLLECTION_RECIPE' ), getCollectionRecipeHandler );
collectionRecipeRouter.get( '/', requestValidator( 'GET_COLLECTION_RECIPES' ), getCollectionRecipesHandler );
collectionRecipeRouter.post( '/', requestValidator( 'CREATE_COLLECTION_RECIPE' ), createCollectionRecipeHandler );
