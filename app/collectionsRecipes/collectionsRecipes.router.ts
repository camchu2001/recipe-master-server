import express from 'express';
import { requestValidator } from '../../middleware';
import { createCollectionRecipeHandler, getCollectionRecipeHandler } from './collectionsRecipes.ctrl';

export const collectionRecipeRouter = express.Router();

collectionRecipeRouter.get( '/:collectionRecipeId', requestValidator( 'GET_COLLECTION_RECIPE' ), getCollectionRecipeHandler );
collectionRecipeRouter.post( '/', requestValidator( 'CREATE_COLLECTION_RECIPE' ), createCollectionRecipeHandler );
