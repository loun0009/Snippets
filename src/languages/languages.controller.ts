import { NextFunction,Request,Response } from "express";
import { languagesRepository } from "./languages.repository";

class LanguagesController {
    public async list(req: Request, res: Response, next: NextFunction): Promise<any> {
        const languages = await languagesRepository.findAll()
        res.render('languages/languages_list', { languages })
    }
}

export const languagesController = new LanguagesController();