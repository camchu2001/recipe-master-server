import express from 'express';
import { userRouter } from './../app/users';
import { recipeRouter } from '../app/recipes';

export const app = express();
app.use( express.json() );

// Routes
app.use( '/users', userRouter );
app.use( '/recipes', recipeRouter );