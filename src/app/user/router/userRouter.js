import {Router} from "express";
import { UserController } from "../controller/userController.js";

const router = Router()

router.post('/register', UserController.userRegister)
router.post('/login', UserController.userLogin)
router.post('/login/admin', UserController.adminLogin)



export default router