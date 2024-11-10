import { Request, Response, NextFunction } from 'express';
import prisma from '../services/prisma';
                
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

export async function isAuthorConnected(req: Request, res: Response, next: NextFunction): Promise<void> {
    const currentUser = req.session.user;
    const snippetId = parseInt(req.params.id, 10);

    if (!currentUser) {
        return res.redirect('/auth/login');
    }

    const currentSnippet = await prisma.snippet.findUnique({
        where: {
            id: snippetId
        },
        select: {
            authorId: true
        }
    });

    if (!currentSnippet || currentSnippet.authorId !== currentUser.id) {
        return res.render('error',
            { message: "Vous devez être l'auteur de ce snippet pour accéder à cette page." }
        );
    }

    next();
}

export function isAdmin(req: Request, res: Response, next: NextFunction): void {
    const currentUser = req.session.user;

    if (currentUser?.role !== "ADMIN") {
        return res.render('error',
            { message: "Vous n'êtes pas connecté en tant qu'administrateur." }
        );
    }

    next();
}
