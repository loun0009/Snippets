
import { NextFunction,Request,Response } from "express";
import { languagesRepository } from "./languages.repository";

class LanguagesController {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    public async list(_req: Request, res: Response, _next: NextFunction): Promise<void> {
        const languages = await languagesRepository.findAll();
        res.render('languages/languages_list', { languages });
    }
}

export const languagesController = new LanguagesController();