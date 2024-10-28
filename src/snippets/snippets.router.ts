import express, { urlencoded } from 'express';
import { snippetsController } from './snippets.controller';
import expressAsyncHandler from 'express-async-handler';
import { query, body, param } from 'express-validator';
import { languageValidator } from '../languages/languages.middlewares';
import { isAuthorConnected, isConnected } from '../auth/auth.middleware';

const snippetsRouter = express.Router();

snippetsRouter.get('/',
    query('lang').
        optional().
        isNumeric().withMessage("le paramètre n'est pas un entier").
        custom(languageValidator),
    expressAsyncHandler(snippetsController.list)
);

snippetsRouter.get('/new',
    isConnected,
    expressAsyncHandler(snippetsController.newForm)
)

snippetsRouter.post('/new',
    isConnected,
    urlencoded({ extended: true }),
    body('title').isLength({ min: 5, max: 50 }),
    body('lang').isNumeric(),
    body('code').isLength({ min: 1, max: 1000 }),
    body('description').isLength({ max: 1000 }),
    expressAsyncHandler(snippetsController.newSnippet)
);

snippetsRouter.get('/edit/:id',
    isAuthorConnected,
    expressAsyncHandler(snippetsController.editForm)
)

snippetsRouter.post('/edit/:id',
    isAuthorConnected,
    urlencoded({ extended: true }),
    param('id').isNumeric().withMessage("ID invalide"),
    body('title').isLength({ min: 5, max: 50 }),
    body('lang').isNumeric(),
    body('code').isLength({ min: 1, max: 1000 }),
    body('description').isLength({ max: 1000 }),
    expressAsyncHandler(snippetsController.editSnippet)
)

snippetsRouter.get('/delete/:id',
    isConnected,
    isAuthorConnected,
    expressAsyncHandler(snippetsController.deleteSnippet)
)

export default snippetsRouter;
