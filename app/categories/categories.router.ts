import express from 'express';
import { createCategoryHandler, getCategoryHandler } from './categories.controller';
import { requestValidator } from '../../middleware';

export const categoryRouter = express.Router();

categoryRouter.get( '/:categoryId', requestValidator( 'GET_CATEGORY' ), getCategoryHandler );
categoryRouter.post( '/', requestValidator( 'CREATE_CATEGORY' ), createCategoryHandler );