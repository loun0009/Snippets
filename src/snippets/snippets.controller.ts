import { NextFunction,Request,Response } from "express";
import { snippetsRepository } from "./snippets.repository";
import { validationResult } from "express-validator";
import { languagesRepository } from "../languages/languages.repository";
import prisma from "../services/prisma";
import { User } from "@prisma/client";

class SnippetsController {
    public async list(req: Request, res: Response, next: NextFunction): Promise<any> {
        const snippets = await snippetsRepository.findAll(Number(req.query.lang));
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.render('error');
        }

        res.render('snippets/snippets_list', { snippets });
    }

    public async newForm(req: Request, res: Response, next: NextFunction): Promise<any> {
        const languages = await languagesRepository.findAll();
        // console.log(req.session.user);
        res.render('snippets/snippet_form', { languages });
    }

    public async newSnippet(req: Request, res: Response, next: NextFunction): Promise<any> {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.render('error');
        }

        const user = req.session.user as User;

        const newSnippet = await prisma.snippet.create({
            data: {
                title: req.body.title,
                code: req.body.code,
                description: req.body.description,
                creationDate: new Date(),
                languageId: parseInt(req.body.lang, 10),
                authorId: user.id
            }
        });

        return res.redirect('/');
    }

    public async editForm(req: Request, res: Response, next: NextFunction): Promise<any> {
        let snippetId = parseInt(req.params.id, 10);

        const languages = await languagesRepository.findAll();
        const snippet = await prisma.snippet.findUnique({
            where: {
                id: snippetId
            },
        });
    
        if (!snippet) {
            return res.render('error', { message: "Snippet introuvable." });
        }
    
        res.render('snippets/snippet_form', { languages, snippet });
    }

    public async editSnippet(req: Request, res: Response, next: NextFunction): Promise<any> {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.render('error');
        }

        let snippetUpdated = await prisma.snippet.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                title: req.body.title,
                code: req.body.code,
                description: req.body.description,
                languageId: parseInt(req.body.lang, 10),
            }
        });

        return res.redirect('/');
    }

    public async deleteSnippet(req: Request, res: Response, next: NextFunction): Promise<any> {
        let snippetId = parseInt(req.params.id, 10);

        let snippetDeleted = await prisma.snippet.delete({
            where: {
                id: snippetId
            }
        });

        return res.redirect('/');
    }
}

export const snippetsController = new SnippetsController();