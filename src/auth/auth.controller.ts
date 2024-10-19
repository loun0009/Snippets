import { NextFunction, Request, Response } from "express";
import { userRepository } from "./user.repository";
import bcrypt from 'bcrypt';

class AuthController {
    public async loginForm(req: Request, res: Response, next: NextFunction): Promise<any> {
        res.render('auth/login');
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        const name = req.body.name;
        const password = req.body.password;
        const user = await userRepository.isExistingUser(name);
        
        const match = await bcrypt.compare(password, user.hashedPassword);

        if (match === false) {
            return res.render('error');
        } else {
            req.session.regenerate((err) => {
                req.session.user = user;
            });

            req.session.save((err) => {
                res.redirect('/');
            });
        }
    }

    public async logout(req: Request, res: Response, next: NextFunction): Promise<any> {
        req.session.destroy((err) => {
            res.redirect('/');
        });
    }
}

export const authController = new AuthController();
