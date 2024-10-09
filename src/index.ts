import session from 'express-session';
import express from 'express';
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

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});
