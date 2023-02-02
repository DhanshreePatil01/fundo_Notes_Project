import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuther } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('/', userController.getAllUsers);

//route to register a new user
router.post('/registration', newUserValidator, userController.userRegistration);

//route to login
router.post('/login',userController.login);

//route to forget Password
router.post('/forgetPwd',userController.pwdForget);

//route to reset Password
router.put('/reset/:token',  resetAuther , userController.pwdReset);

export default router;
