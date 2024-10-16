import express from 'express';
import expressAsyncHandler from "express-async-handler";
import { authController } from './auth.controller';

const authRouter = express.Router();
authRouter.get('/login',
    expressAsyncHandler(authController.loginForm)
);

export default authRouter;