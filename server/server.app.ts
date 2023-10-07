import express from 'express';
import { userRouter } from './../app/users';

export const app = express();
app.use( express.json() );

// Routes
app.use( '/users', userRouter );