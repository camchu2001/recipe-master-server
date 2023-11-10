import express from 'express';
import { userRouter } from './../app/users';
import { recipeRouter } from '../app/recipes';
import { collectionRouter } from '../app/collections';
import { recipeCategoryRouter }  from '../app/recipesCategories';

export const app = express();
app.use( express.json() );

// Routes
app.use( '/users', userRouter );
app.use( '/recipes', recipeRouter );
app.use( '/collections', collectionRouter );
app.use( '/recipes-categories', recipeCategoryRouter );