/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";
import { adminRepository } from "./admin.repository";
import { validationResult } from "express-validator";

import prisma from "../services/prisma";
import { Role } from "@prisma/client";
import bcrypt from 'bcrypt';

const roles = [Role.ADMIN, Role.USER];

class AdminController {
    public index(req: Request, res: Response, next: NextFunction): void {
        res.render('admin/index');
    }
    
    public async showUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const users = await adminRepository.findAllUsers();

        res.render('admin/users', { users });
    }

    public async showUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.render('error');
        }

        const userId = parseInt(req.params.id, 10);
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        res.render('admin/users_edit', { u: user, roles });
    }

    public async editUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.render('error');
        }

        await prisma.user.update({
            where: {
                id: parseInt(req.params.id, 10)
            },
            data: {
                name: req.body.name,
                role: req.body.role
            }
        });

        return res.redirect('/admin/users');
    }

    public newForm(req: Request, res: Response, next: NextFunction): void {
        return res.render('admin/user_new', { roles });
    }

    public async newUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.render('error');
        }

        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);

        await prisma.user.create({
            data: {
                name: req.body.name,
                role: req.body.role,
                hashedPassword: bcrypt.hashSync(req.body.password, salt),
            }
        });

        return res.redirect('/admin/users');
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = parseInt(req.params.id, 10);

        await prisma.user.delete({
            where: {
                id: userId
            }
        });

        return res.redirect('/');
    }

}

export const adminController = new AdminController();
