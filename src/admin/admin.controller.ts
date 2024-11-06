/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";

class AdminController {
    public index(req: Request, res: Response, next: NextFunction): void {
        res.render('admin/index');
    }
}

export const adminController = new AdminController();
