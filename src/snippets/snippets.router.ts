import express from 'express';
import { snippetsController } from './snippets.controller';
import expressAsyncHandler from 'express-async-handler';
const snippetsRouter  = express.Router();

snippetsRouter.get('/', expressAsyncHandler(snippetsController.list));

export default snippetsRouter;