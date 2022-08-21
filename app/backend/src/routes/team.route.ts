import { Router } from 'express';
import TeamController from '../controllers/teamController';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.getAll);

export default router;
