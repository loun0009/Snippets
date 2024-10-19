import express, { urlencoded } from 'express';
import expressAsyncHandler from "express-async-handler";
import { authController } from './auth.controller';

const authRouter = express.Router();

authRouter.get('/login',
    expressAsyncHandler(authController.loginForm)
);

authRouter.post('/login',
    urlencoded({ extended: true }),
    expressAsyncHandler(authController.login)
)

authRouter.get('/logout',
    expressAsyncHandler(authController.logout)
)

export default authRouter;