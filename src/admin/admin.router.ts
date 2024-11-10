import express, { urlencoded } from "express";
import { adminController } from "./admin.controller";
import expressAsyncHandler from 'express-async-handler';
import { body } from "express-validator";

const adminRouter = express.Router();

adminRouter.get('/',
    adminController.index
)

adminRouter.get('/users',
    expressAsyncHandler(adminController.showUsers)
)

adminRouter.get('/users/:id',
    expressAsyncHandler(adminController.showUser)
)

adminRouter.post('/users/:id',
    urlencoded({ extended: true }),
    body('name').isLength({ min: 4, max: 20 }),
    expressAsyncHandler(adminController.editUser)
)

adminRouter.get('/user/new',
    expressAsyncHandler(adminController.newForm)
)

adminRouter.post('/user/new',
    urlencoded({ extended: true }),
    body('name').isLength({ min: 4, max: 20 }),
    body('password').isLength({ min: 4 }),
    expressAsyncHandler(adminController.newUser)
)

export default adminRouter;
