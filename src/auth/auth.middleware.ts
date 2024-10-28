import { Request, Response, NextFunction } from 'express';
                
export function sessionUser(req: Request, res: Response, next: NextFunction): void {
    res.locals.user = req.session.user;
    next();
}

export function isConnected(req: Request, res: Response, next: NextFunction): void {
    const currentUser = req.session.user;
    if (!currentUser) {
        return res.redirect('/auth/login');
    }
    next();
}
