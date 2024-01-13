import {Router} from "express";
import { UserController } from "../controller/userController.js";

const router = Router()

router.get('/set', UserController.setCookie)
router.get('/get', UserController.getCookie)
router.post('/register', UserController.userRegister)
router.post('/login', UserController.userLogin)


export default router