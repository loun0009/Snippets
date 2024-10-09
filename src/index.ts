import 'dotenv/config';
import session from 'express-session';
import express, { NextFunction,Request,Response} from 'express';
import snippetsRouter from './snippets/snippets.router';

const app = express();



app.use(session({
    secret: process.env.session_secret as string,
    saveUninitialized: false,
    resave: false
}));

const port = process.env.port;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/',snippetsRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});


