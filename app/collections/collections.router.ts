import express from 'express';
import { requestValidator } from '../../middleware';
import { createCollectionHandler, getCollectionHandler } from './collections.ctrl';

export const collectionRouter = express.Router();

collectionRouter.get( '/:collectionId', requestValidator( 'GET_COLLECTION' ), getCollectionHandler );
collectionRouter.post( '/', requestValidator( 'CREATE_COLLECTION' ), createCollectionHandler );
