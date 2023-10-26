import express from 'express';
import { requestValidator } from '../../middleware';
import {
    createCollectionHandler, getCollectionHandler, getCollectionsHandler
} from './collections.ctrl';

export const collectionRouter = express.Router();

collectionRouter.get( '/:collectionId', requestValidator( 'GET_COLLECTION' ), getCollectionHandler );
collectionRouter.get( '/', requestValidator( 'GET_COLLECTIONS' ), getCollectionsHandler );
collectionRouter.post( '/', requestValidator( 'CREATE_COLLECTION' ), createCollectionHandler );
