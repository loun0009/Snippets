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

adminRouter.get('/user/delete/:id',
    expressAsyncHandler(adminController.deleteUser)
)

adminRouter.get('/languages',
    expressAsyncHandler(adminController.showLanguages)
)

adminRouter.get('/languages/:id',
    expressAsyncHandler(adminController.showLanguage)
)

adminRouter.post('/languages/:id',
    urlencoded({ extended: true }),
    body('name').notEmpty(),
    body('logo').notEmpty(),
    body('htmlClass').notEmpty(),
    expressAsyncHandler(adminController.editLanguage)
)

adminRouter.get('/language/new',
    expressAsyncHandler(adminController.newLanguageForm)
)

adminRouter.post('/language/new',
    urlencoded({ extended: true }),
    body('name').notEmpty(),
    body('logo').notEmpty(),
    body('htmlClass').notEmpty(),
    expressAsyncHandler(adminController.newLanguage)
)

adminRouter.get('/language/delete/:id',
    expressAsyncHandler(adminController.deleteLanguage)
)

export default adminRouter;
