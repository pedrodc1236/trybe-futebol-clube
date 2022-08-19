import { Router } from 'express';
import LoginController from '../database/controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.route('/')
  .post(loginController.login);

export default router;
