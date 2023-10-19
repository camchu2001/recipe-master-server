import express from 'express';
import { createCategoryHandler, getCategoryHandler } from './categories.controller';

export const categoryRouter = express.Router();

categoryRouter.get( '/:categoryId', getCategoryHandler );
categoryRouter.post( '/', createCategoryHandler );