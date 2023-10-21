import express from 'express';

import {
    getUserHandler,
    createUserHandler
} from './users.ctrl';
import { requestValidator } from '../../middleware';

export const userRouter = express.Router();

userRouter.get( '/:userId', requestValidator( 'GET_USER' ),  getUserHandler );
userRouter.post( '/', requestValidator( 'CREATE_USER' ), createUserHandler );
