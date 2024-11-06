import 'dotenv/config';
import session from 'express-session';
import express, { NextFunction,Request,Response} from 'express';

import snippetsRouter from './snippets/snippets.router';
import languagesRouter from './languages/languages.router';
import authRouter from './auth/auth.router';
import adminRouter from './admin/admin.router';

import { isAdmin, sessionUser } from './auth/auth.middleware';

const app = express();
const port = process.env.port;

app.use(session({
    secret: process.env.session_secret as string,
    saveUninitialized: false,
    resave: false
}));


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(sessionUser);

app.use('/', snippetsRouter);
app.use('/languages', languagesRouter);
app.use('/auth', authRouter);
app.use('/admin',
    isAdmin,
    adminRouter
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
