import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { languagesController } from './languages.controller';

const languagesRouter = express.Router();

languagesRouter.get('/',
    expressAsyncHandler(languagesController.list)
);

export default languagesRouter;
