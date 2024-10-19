import express from 'express';
import { snippetsController } from './snippets.controller';
import expressAsyncHandler from 'express-async-handler';
import { query } from 'express-validator';
import { languageValidator } from '../languages/languages.middlewares';

const snippetsRouter = express.Router();

snippetsRouter.get('/',
    query('lang').
        optional().
        isNumeric().withMessage("le paramètre n'est pas un entier").
        custom(languageValidator),
    expressAsyncHandler(snippetsController.list)
);

export default snippetsRouter;