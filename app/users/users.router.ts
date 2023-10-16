import express from 'express';

import {
    getUserHandler,
    createUserHandler
} from './users.ctrl';

export const userRouter = express.Router();

userRouter.get( '/:userId', getUserHandler );
userRouter.post( '/', createUserHandler );
