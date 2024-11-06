import express from "express";
import expressAsyncHandler from "express-async-handler";
import { adminController } from "./admin.controller";

const adminRouter = express.Router();

adminRouter.get('/',
    expressAsyncHandler(adminController.index)
)

export default adminRouter;
