import { NextFunction, Request, Response } from "express";

class AdminController {
    public async index(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.render('admin/index');
    }
}

export const adminController = new AdminController();
