import express from 'express';
import { snippetsController } from './snippets.controller';
const snippetsRouter  = express.Router();

snippetsRouter.get('/', snippetsController.list);

export default snippetsRouter;