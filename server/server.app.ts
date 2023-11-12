import express from 'express';
import { userRouter } from './../app/users';
import { recipeRouter } from '../app/recipes';
import { categoryRouter } from '../app/categories';
import { collectionRouter } from '../app/collections';

export const app = express();
app.use( express.json() );

// Routes
app.use( '/users', userRouter );
app.use( '/recipes', recipeRouter );
app.use( '/categories', categoryRouter );
app.use( '/collections', collectionRouter );
