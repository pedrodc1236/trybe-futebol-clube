import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import MatchController from '../controllers/matchController';

const router = Router();

const matchController = new MatchController();

router.post('/', authMiddleware, matchController.create);
router.get('/', matchController.getAll);
router.patch('/:id/finish', matchController.finish);
router.patch('/:id', matchController.update);

export default router;
