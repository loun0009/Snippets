import { NextFunction,Request,Response } from "express";
import { snippetsRepository } from "./snippets.repository";
import { validationResult } from "express-validator";

class SnippetsController {
    public async list(req: Request, res: Response, next: NextFunction): Promise<any> {
        const snippets = await snippetsRepository.findAll(Number(req.query.lang));
        const result = validationResult(req);
        console.log(result);
        if (!result.isEmpty()) {
            return res.render('error')
        }
        console.log(snippets);

        res.render('snippets/snippets_list', { snippets });
    }
}

export const snippetsController = new SnippetsController();