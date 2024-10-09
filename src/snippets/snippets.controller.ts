import { NextFunction,Request,Response } from "express";
import { snippetsRepository } from "./snippets.repository";

class SnippetsController {
    public async list(req: Request, res: Response, next: NextFunction): Promise<any> {
        console.log(snippetsRepository.findAll());
    }
}

export const snippetsController = new SnippetsController();