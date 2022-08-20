import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import LoginController from '../controllers/loginController';

const router = Router();

const loginController = new LoginController();

router.get('/validate', authMiddleware, loginController.validateLogin);
router.post('/', loginController.login);

export default router;
