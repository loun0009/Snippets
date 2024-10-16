import { NextFunction,Request,Response } from "express";

class AuthController {
    public async loginForm(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.render('auth/login');
    }
}

export const authController = new AuthController();
