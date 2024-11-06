import express from "express";
import { adminController } from "./admin.controller";

const adminRouter = express.Router();

adminRouter.get('/',
    adminController.index
)

export default adminRouter;
