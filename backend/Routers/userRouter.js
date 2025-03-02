import express from 'express';
import { loginControllers, registerControllers } from '../controllers/userController.js';

const router = express.Router();

router.route("/register").post(registerControllers); //http://localhost:3002/api/auth/register

router.route("/login").post(loginControllers);//http://localhost:3002/api/auth/login

//router.route("/setAvatar/:id").post(setAvatarController);

export default router;